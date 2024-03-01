import { Module } from '@nestjs/common';
import { RegistrService } from './registr.service';
import { RegistrController } from './registr.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  
  controllers: [RegistrController],
  providers: [RegistrService,PrismaService],
})
export class RegistrModule {}
