import { Module } from '@nestjs/common';
import { GetuserService } from './getuser.service';
import { GetuserController } from './getuser.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [GetuserController],
  providers: [GetuserService,PrismaService],
})
export class GetuserModule {}
