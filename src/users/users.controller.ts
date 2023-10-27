import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { StringSchema } from 'joi';

@Controller('users')
@ApiTags('User API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('Add')
  @ApiOperation({ summary: 'Creates User', description: 'Contains UserName and password' })
  @ApiBody({
    schema: {
      properties: {
        userName: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Read All Users', description: 'Contains ID Number, Username, and Password' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':userName')
  @ApiOperation({ summary: 'Read a User of Requested Username', description: 'Contains ID Number, Username, and Password' })
  findOne(@Param('userName') userName: string) {
    return this.usersService.findOneByUserName(userName);
  }

  @Patch(':userName')
  @ApiBody({
    schema: {
      properties: {
        userName: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiOperation({ summary: 'Read a User of Requested ID and Change Password', description: 'Get User Information and Change Password' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':userName')
  @ApiOperation({ summary: 'Read a User of Requested ID and Remove', description: 'Get User Information and Remove' })
  remove(@Param('userName') userName: string) {
    return this.usersService.remove(userName);
  }
}
