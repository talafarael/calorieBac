import { Injectable } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { generateAccessToken } from 'middleware/generateAccessToken';
@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}
  async create(dto: RegisterDto) {
    console.log(';fafa');
    const existingUser = await this.prisma.users.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new Error('Пользователь с данным email уже существует');
    }
    dto.password = await bcrypt.hash(dto.password, 7);
    
    const createdUser =await this.prisma.users.create({
      data: dto,
    });
    const token = generateAccessToken(createdUser.id);
    return {
      token
      };
  }
}
