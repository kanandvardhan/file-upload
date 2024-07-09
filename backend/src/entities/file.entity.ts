import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum FileType {
  JPG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  PDF = 'application/pdf',
  DOC = 'application/msword',
  DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  WEBM = 'video/webm',
  MP4 = 'video/mp4',
  MOV = 'video/quicktime',
}

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({
    type: 'enum',
    enum: FileType,
  })
  filetype: FileType;

  @CreateDateColumn()
  created_date: Date;
}
