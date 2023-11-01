import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private databaseFilesRepository: Repository<File>,
  ) {}

  async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
    const newFile = new File();
    newFile.filename = filename;
    newFile.data = dataBuffer;

    await this.databaseFilesRepository.save(newFile);
    return newFile;
  }

  async getFileList() {
    const result = await this.databaseFilesRepository.find();

    if (!result) {
      throw new BadRequestException('ID Does not exist');
    }
    const finalList: object[] = [];
    for (const r of result) {
      finalList.push({ fileName: r.filename, id: r.id });
    }

    return finalList;
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

  async deleteFile(fileId: number): Promise<boolean> {
    const deleteResponse = await this.databaseFilesRepository.delete({ id: fileId });
    if (!deleteResponse.affected) {
      throw new NotFoundException();
    }
    return true;
  }
}
