import { Injectable } from '@nestjs/common';
import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';

@Injectable()
export class CustomFileTypeValidator extends FileValidator {
  constructor(private readonly allowedTypes: string[]) {
    super(allowedTypes);
  }

  isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
    if (!file) {
      return false;
    }
    const ext = file.originalname.split('.').pop();
    return this.allowedTypes.includes(ext);
  }

  buildErrorMessage(file: Express.Multer.File): string {
    return `File type ${file.mimetype} is not allowed. Allowed types are: ${this.allowedTypes.join(', ')}`;
  }
}
