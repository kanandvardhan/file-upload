import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { KYCApprovalStatus } from '../entities/kyc.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateKycDto } from 'src/kyc/dto/create-kyc-dto';
import { LoginDto } from './login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.createUser(createUserDto);
    return { user };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findByPhone(loginDto.phone);
    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }
    return { user };
  }

  @Post(':id/kyc')
  @UseInterceptors(FileInterceptor('file'))
  async addKYC(
    @Param('id') id: string,
    @Body() kycDto: CreateKycDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const kyc = await this.userService.addKYC(id, kycDto);
    return { kyc };
  }

  @Patch(':id/kyc/status')
  async updateKYCStatus(
    @Param('id') id: number,
    @Body()
    { status, remarks }: { status: KYCApprovalStatus; remarks?: string },
  ): Promise<any> {
    const kyc = await this.userService.updateKYCStatus(id, status, remarks);
    return { kyc };
  }
}
