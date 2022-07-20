import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@ApiTags('menu')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  create(
    @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  @Delete('')
  removeUser(
    @Query() deleteUserDto: DeleteUserDto
  ): Promise<any> {
    return this.userService.removeUser(deleteUserDto)
  }
}
