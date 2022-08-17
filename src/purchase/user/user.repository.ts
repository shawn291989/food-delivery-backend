import { EntityRepository, Repository, getConnection, getRepository, Timestamp } from 'typeorm';
import * as moment from 'moment'
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async getUserIdByUserName(userName: string): Promise<string> {
    const user = await this.findOne({
      where: {
        name: userName
      }
    });
    if (user) {
      return user.id;
    }
    throw new NotFoundException('User, ' + userName + ', is not registered !!!');
  }

  async getSpendAmountByUserId(id: string): Promise<number> {
    const userInfo = await this.findOne({
      where: {
        id
      }
    });
    if (userInfo) {
      return userInfo.spentAmount;
    }
    throw new NotFoundException('User with id, ' + id + ', does not exist !!!');
  }

  async getUserById(id: string): Promise<User> {
    const res = await this.findOne({
      where: {
        id
      }
    });
    if (!res) {
      throw new NotFoundException(
        `No user found with id "${id}" !!!`,
      );
    }
    return res;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.create({
      name: createUserDto.name,
      spentAmount: createUserDto.spentAmount,
      address: createUserDto.address,
      updated: moment().utc(),
    });

    const existingUser = await this.findOne({
      where: {
        name: createUserDto.name
      }
    });
    if (existingUser) {
      newUser.id = existingUser.id;
    }
    await this.save(newUser);
    return newUser
  }

  async updateUserExpances(id: string, currentBalance: number, transectionAmount: number)
    : Promise<CreateUserResponseDto> {
    const userValues = await this.getUserById(id);
    const convertedCurrentBalance: number = +currentBalance;
    const newAmount = convertedCurrentBalance + transectionAmount;
    userValues.spentAmount = newAmount;
    await this.save(userValues);
    const updatedCashBalance = {
      uuid: userValues.id,
      totalSpentAmount: userValues.spentAmount,
      address: userValues.address
    };
    return updatedCashBalance;
  }
  async removeUser(deleteUserDto: DeleteUserDto) {
    await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(User)
      .where('id = :userId', { userId: deleteUserDto.userId })
      .execute();

  }
}