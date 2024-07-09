import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/user.entity';
import { KYC } from 'src/entities/kyc.entity';
import { KYCDoc } from 'src/entities/kyc-doc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, KYC, KYCDoc])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
