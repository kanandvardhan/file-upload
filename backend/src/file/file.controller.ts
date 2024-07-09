import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { CustomFileTypeValidator } from './validators/file-type.validator';
import { CustomFileSizeValidator } from './validators/file-size.validator';
import { ParseFilePipe } from '@nestjs/common/pipes/file/parse-file.pipe';
import { FileType } from '../entities/file.entity';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndPassValidation(
    @Body() body,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new CustomFileTypeValidator([
            'jpg',
            'jpeg',
            'png',
            'svg',
            'pdf',
            'doc',
            'docx',
            'webm',
            'mp4',
            'mov',
          ]),
          new CustomFileSizeValidator(5 * 1024 * 1024, 1 * 1024),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const filetype = this.getFileType(file.mimetype);
    if (!filetype) {
      throw new BadRequestException('Unsupported file type');
    }

    const savedFile = await this.fileService.createFile(
      file.originalname,
      filetype,
    );

    console.log(savedFile);
    return {
      file: savedFile,
    };
  }

  private getFileType(mimeType: string): FileType | undefined {
    switch (mimeType) {
      case 'image/jpeg':
        return FileType.JPG;
      case 'image/png':
        return FileType.PNG;
      case 'image/svg+xml':
        return FileType.SVG;
      case 'application/pdf':
        return FileType.PDF;
      case 'application/msword':
        return FileType.DOC;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return FileType.DOCX;
      case 'video/webm':
        return FileType.WEBM;
      case 'video/mp4':
        return FileType.MP4;
      case 'video/quicktime':
        return FileType.MOV;
      default:
        return undefined;
    }
  }
}
