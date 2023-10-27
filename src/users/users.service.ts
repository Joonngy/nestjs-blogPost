import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './interfaces/user-info.interface';
import { FileEntity } from 'src/file/file.entity';
import { FileService } from 'src/file/file.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FileEntity)
    private databaseFilesRepository: Repository<FileEntity>,
    private readonly databaseFilesService: FileService,
  ) {}

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user == null) {
      throw new BadRequestException('User does not exist');
    }

    const currentAvatarId = user.avatarId;
    const avatar = await this.databaseFilesService.uploadDatabaseFile(imageBuffer, filename);
    await this.userRepository.update(userId, {
      avatarId: avatar.id,
    });

    if (currentAvatarId) {
      const deleteResult = await this.databaseFilesService.deleteFile(currentAvatarId);
      if (deleteResult !== true) {
        throw new BadRequestException('Cannot Delete File');
      }
    }

    return { filename: avatar.filename, id: avatar.id };
  }

  async getFileById(fileId: number) {
    const file = await this.databaseFilesRepository.findOne({
      where: {
        id: fileId,
      },
    });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async createUser(userName: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException('Use Different Email address.');
    }

    const userNameExist = await this.checkUserName(userName);
    if (userNameExist) {
      throw new UnprocessableEntityException('Use Difference UserName.');
    }

    const user = new UserEntity();
    user.userName = userName;
    user.email = email;
    user.password = password;

    return this.userRepository.save(user);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        email: emailAddress,
      },
    });

    return user !== null;
  }

  private async checkUserName(userName: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {
        userName: userName,
      },
    });

    return user !== null;
  }

  async findByLogin(email: string, password: string): Promise<UserEntity> {
    console.log('findByLogin');
    const user = await this.userRepository.findOne({ where: { email, password } });

    if (!user) {
      throw new ForbiddenException('Check ID and Password');
    }

    return user;
  }

  async findAll() {
    const result = await this.userRepository.find();

    if (!result) {
      throw new BadRequestException('ID Does not exist');
    }
    console.log(result);
    return result;
  }

  async getUserInfo(userId: number): Promise<UserInfo> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User Does not exist');
    }

    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
    };
  }

  async findOneByUserName(userName: string): Promise<UserEntity> {
    console.log(userName);
    const result = await this.userRepository.findOneBy({ userName });

    if (result == null) {
      throw new BadRequestException('ID Does not exist');
    }

    return result;
  }

  async update(req: any, updateUserDto: UpdateUserDto) {
    const checkName: string = req.user.username;
    console.log(checkName);
    console.log(updateUserDto);
    const user = await this.userRepository.findOne({ where: { userName: checkName } });

    if (user == null) {
      throw new BadRequestException('Id does not exist');
    }

    if (user.userName === updateUserDto.userName) {
      throw new BadRequestException('Same as Current Username');
    }

    if ((await this.userRepository.findOne({ where: { userName: updateUserDto.userName } })) !== null) {
      throw new BadRequestException('Selected Username Already Exists');
    }

    if (user.password === updateUserDto.password) {
      throw new BadRequestException('Same as Current Password');
    }

    this.userRepository.merge(user, updateUserDto);
    const result = this.userRepository.save(user);

    if (result == null) {
      throw new BadRequestException('Cannot Save');
    }

    req.user.username = user.userName;

    return result;
  }

  async remove(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user == null) {
      throw new BadRequestException('User does not exist');
    }
    console.log(user);
    const currentAvatarId = user.avatarId;

    const result = await this.userRepository.delete({ id: userId });

    if (result.affected == 0) {
      throw new BadRequestException('Cannot Delete');
    }

    if (currentAvatarId) {
      const deleteResult = await this.databaseFilesService.deleteFile(currentAvatarId);
      console.log('Delete?');
      if (deleteResult !== true) {
        throw new BadRequestException('Cannot Delete File');
      }
    }

    return true;
  }
}
