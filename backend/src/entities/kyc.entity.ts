import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { KYCDoc } from './kyc-doc.entity';

export enum KYCApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class KYC {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  kycId: string;

  @Column({
    type: 'enum',
    enum: KYCApprovalStatus,
    default: KYCApprovalStatus.PENDING,
  })
  approvedStatus: KYCApprovalStatus;

  @Column({ nullable: true })
  panNo: string;

  @Column({ nullable: true })
  aadharNo: string;

  @Column({ nullable: true })
  remarks: string;

  @OneToOne(() => User, (user) => user.kyc)
  user: User;

  @OneToMany(() => KYCDoc, (doc) => doc.kyc)
  documents: KYCDoc[];
}
