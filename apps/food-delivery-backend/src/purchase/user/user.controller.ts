import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@ApiTags('User (Register/Remove)')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: CreateUserDto,
  })
  @ApiOperation({ description: 'This API performs to register/populate user information into Database.' })
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto,
  })
  create(
    @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
  @ApiOkResponse({
    description: 'User removed.',
    type: DeleteUserDto,
  })
  @ApiOperation({ description: 'This API performs to remove/soft delete, user information from Database.' })
  @Delete('')
  removeUser(
    @Query() deleteUserDto: DeleteUserDto
  ): Promise<any> {
    return this.userService.removeUser(deleteUserDto)
  }
}
