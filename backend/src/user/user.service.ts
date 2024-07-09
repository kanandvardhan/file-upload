import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { KYC } from '../entities/kyc.entity';
import { KYCDoc } from '../entities/kyc-doc.entity';
import { KYCApprovalStatus } from '../entities/kyc.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(KYC) private kycRepository: Repository<KYC>,
    @InjectRepository(KYCDoc) private kycDocRepository: Repository<KYCDoc>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userRepository.findOne({
      where: { phone: userData.phone },
    });

    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async signin(loginDto: LoginDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { phone: loginDto.phone },
      relations: ['kyc'],
    });

    if (!user) {
      throw new NotFoundException('User does not exists');
    } else {
      const match = await bcrypt.compare(loginDto.password, user.password);
      if (match) return user;
      else
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  async addKYC(userId: string, kycData: Partial<KYC>): Promise<KYC> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('KYC not found', HttpStatus.BAD_REQUEST);
    }
    kyc.approvedStatus = status;
    kyc.remarks = remarks;

    return this.kycRepository.save(kyc);
  }
}
