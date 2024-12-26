import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config"
import PrismaModule from './prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import AuthModule from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), JwtModule.register({global:true, }),PrismaModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
