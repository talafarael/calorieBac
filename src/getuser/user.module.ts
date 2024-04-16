import { Module } from '@nestjs/common';
import {userService } from './user.service';
import { userController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [userController],
  providers: [userService, PrismaService],
})
export class GetuserModule {}
