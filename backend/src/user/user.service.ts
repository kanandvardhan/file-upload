import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { KYC } from '../entities/kyc.entity';
import { KYCDoc } from '../entities/kyc-doc.entity';
import { KYCApprovalStatus } from '../entities/kyc.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(KYC) private kycRepository: Repository<KYC>,
    @InjectRepository(KYCDoc) private kycDocRepository: Repository<KYCDoc>,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
      relations: ['kyc'],
    });
  }

  async addKYC(userId: string, kycData: Partial<KYC>): Promise<KYC> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const kyc = this.kycRepository.create(kycData);
    kyc.user = user;

    const savedKYC = await this.kycRepository.save(kyc);

    for (const doc of kyc.documents) {
      const kycDoc = this.kycDocRepository.create(doc);
      kycDoc.kyc = savedKYC;
      await this.kycDocRepository.save(kycDoc);
    }

    return savedKYC;
  }

  async updateKYCStatus(
    kycId: number,
    status: KYCApprovalStatus,
    remarks: string,
  ): Promise<KYC> {
    const kyc = await this.kycRepository.findOne({
      where: { id: kycId },
      relations: ['user'],
    });
    if (!kyc) {
      throw new Error('KYC not found');
    }
    kyc.approvedStatus = status;
    kyc.remarks = remarks;

    return this.kycRepository.save(kyc);
  }
}
