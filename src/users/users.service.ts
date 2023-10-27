import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import * as typeorm from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @typeorm.InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = new UserEntity();
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;

    const userName: string = user.userName;
    const check = await this.userRepository.findOneBy({ userName });

    if (check !== null) {
      throw new BadRequestException('ID Already Exists');
    }

    return await this.userRepository.save(user);
  }

  async findAll() {
    const result = await this.userRepository.find();

    if (result == null) {
      throw new BadRequestException('ID Does not exist');
    }

    return result;
  }

  async findOneByUserName(userName: string): Promise<UserEntity> {
    const result = await this.userRepository.findOneBy({ userName });

    if (result == null) {
      throw new BadRequestException('ID Does not exist');
    }

    return result;
  }

  async update(updateUserDto: UpdateUserDto) {
    const userName: string = updateUserDto.userName;
    const user = await this.userRepository.findOne({ where: { userName } });
    if (user == null) {
      throw new BadRequestException('Id does not exist');
    }

    if (user.password === updateUserDto.password) {
      throw new BadRequestException('Same as Current Password');
    }

    this.userRepository.merge(user, updateUserDto);
    const result = this.userRepository.save(user);

    if (result == null) {
      throw new BadRequestException('Cannot Save');
    }

    return result;
  }

  async remove(userName: string): Promise<boolean> {
    const result = await this.userRepository.delete({ userName: userName });
    
    if (result.affected == 0) {
      throw new BadRequestException('Cannot Delete');
    }

    return true;
  }
}
