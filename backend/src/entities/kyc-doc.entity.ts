import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { KYC } from './kyc.entity';

export enum DocumentType {
  AADHAR = 'AADHAR',
  PAN = 'PAN',
  PHOTO = 'PHOTO',
}

@Entity()
export class KYCDoc {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => KYC, (kyc) => kyc.documents)
  kyc: KYC;

  @Column({ type: 'enum', enum: DocumentType })
  docType: DocumentType;

  @Column()
  docPath: string;
}
