import { EntityRepository, Repository, getConnection, getRepository, Timestamp } from 'typeorm';
import * as moment from 'moment'
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async getUserIdByUserName(userName: string) {
    const user = await this.findOne({
      name: userName
    });
    if (user) {
      return user.id;
    }
    throw new NotFoundException('User, ' + userName + ', is not registered !!!');
  }

  async getCashBalanceByUserId(id: string) {
    const userInfo = await this.findOne({
      id
    });
    if (userInfo) {
      return userInfo.cashBalance;
    }
    throw new NotFoundException('User with id, ' + id + ', does not exist !!!');
  }

  async getUserById(id: string) {
    const res = await this.findOne({
      id,
    });
    if (!res) {
      throw new NotFoundException(
        `No user found with id "${id}" !!!`,
      );
    }
    return res;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.create({
      name: createUserDto.name,
      cashBalance: createUserDto.cashBalance,
      updated: moment().utc(),
    });

    const existingUser = await this.findOne({
      name: createUserDto.name,
      // cashBalance: createUserDto.cashBalance,
    });
    if (existingUser) {
      newUser.id = existingUser.id;
    }
    await this.save(newUser);
    return newUser
  }

  async updateUserCashBalance(id: string, currentBalance: number, transectionAmount: number)
    : Promise<any> {
    const userValues = await this.getUserById(id);
    const convertedCurrentBalance: number = +currentBalance;
    if (convertedCurrentBalance < transectionAmount) {
      throw new BadRequestException(
        `Transection amount can not be bigger than current balance`,
      );
    }
    const newBalance = convertedCurrentBalance - transectionAmount;
    userValues.cashBalance = newBalance;
    await this.save(userValues);
    const updatedCashBalance = {
      uuid: userValues.id,
      newBalance: userValues.cashBalance
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