import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }
  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.name || !createUserDto.cashBalance) {
      throw new BadRequestException(
        `Username or cashbalance can not be null !!!`
      );
    }
    const newUser = await this.userRepository.createUser(createUserDto);
    return newUser
  }
  async removeUser(deleteUserDto: DeleteUserDto) {
    if (!deleteUserDto.userId) {
      throw new BadRequestException(
        `UserId can not be empty !!!`,
      );
    }
    const removeUser = await this.userRepository.removeUser(deleteUserDto);
    return removeUser
  }
}