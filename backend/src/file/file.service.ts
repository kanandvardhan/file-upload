import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File, FileType } from '../entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async createFile(filename: string, filetype: FileType): Promise<File> {
    try {
      const file = this.fileRepository.create({ filename, filetype });
      return await this.fileRepository.save(file);
    } catch (error) {}
  }
}
