import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config"
import PrismaModule from './prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), JwtModule.register({global:true, }),PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
