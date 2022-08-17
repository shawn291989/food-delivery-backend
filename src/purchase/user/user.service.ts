import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.name || !createUserDto.address) {
      throw new BadRequestException(
        `Username or address can not be null !!!`
      );
    }
    createUserDto.spentAmount = 0;
    const newUser = await this.userRepository.createUser(createUserDto);
    return newUser
  }
  async removeUser(deleteUserDto: DeleteUserDto): Promise<void> {
    if (!deleteUserDto.userId) {
      throw new BadRequestException(
        `UserId can not be empty !!!`,
      );
    }
    await this.userRepository.removeUser(deleteUserDto);
  }
}