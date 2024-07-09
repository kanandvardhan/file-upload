import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { ConfigModule } from './config/config.module';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { File } from './entities/file.entity';
import { User } from './entities/user.entity';
import { KYC } from './entities/kyc.entity';
import { KYCDoc } from './entities/kyc-doc.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST!,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      entities: [File, User, KYC, KYCDoc],
      synchronize: true,
    }),
    ConfigModule,
    FileModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
