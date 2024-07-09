import { Injectable } from '@nestjs/common';
import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';

@Injectable()
export class CustomFileSizeValidator extends FileValidator {
  constructor(
    private readonly maxSize: number,
    private readonly minSize: number,
  ) {
    super({ maxSize, minSize });
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (!file) {
      return false;
    }
    return file.size <= this.maxSize && file.size >= this.minSize;
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `File size ${file.size} is not within the allowed range of ${this.minSize} - ${this.maxSize} bytes.`;
  }
}
