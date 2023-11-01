import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UserLoginDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddAvatarDto } from './dto/avatar-user.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('User API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Creates User', description: 'Contains UserName and password' })
  async create(@Body() createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;
    return this.usersService.createUser(userName, email, password);
  }

  @Post('avatar')
  @ApiOperation({ summary: 'Creates Avatar', description: 'Adds an Avatar file into the User' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Body() avatarDto: AddAvatarDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.addAvatar(req.user.userId, file.buffer, file.originalname);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User', description: 'Enter Email and Password to Login' })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() dto: UserLoginDto) {
    dto.email;
    return req.user;
  }

  @Get('')
  @ApiOperation({ summary: 'Read All Users', description: 'Contains ID Number, Username, and Password' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':userName')
  @ApiOperation({ summary: 'Read a User of Requested Username', description: 'Contains ID Number, Username, and Password' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  findOne(@Param('userName') userName: string) {
    return this.usersService.findOneByUserName(userName);
  }

  @Patch('')
  @ApiOperation({ summary: 'Read a User of Requested ID and Change Password', description: 'Get User Information and Change Password' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Read a User of Requested ID and Remove', description: 'Get User Information and Remove' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
