import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { generateAccessToken } from 'middleware/generateAccessToken';
import {
  checkAndRegisterDto,
  LoginDto,
  RegisterDto,
  tokenDto,
} from './auth.dto';
import verifyToken from 'middleware/verifyToken';
import Emailsend from 'sendEmail';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: LoginDto) {
    const User = await this.prisma.users.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!User) {
      throw new NotFoundException('Пользователь с данным email не существует');
    }
    const validPassword = bcrypt.compareSync(dto.password, User.password);
    if (!validPassword) {
      throw new NotFoundException('не верный пароль');
    }
    // '365d'
    const token = generateAccessToken(User.id, '365d');
    return {
      token,
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.users.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      await this.prisma.userRegister.delete({
        where: {
          email: dto.email,
        },
      });
    }
    if (existingUser) {
      throw new NotFoundException('Пользователь с данным email уже существует');
    }
    dto.password = await bcrypt.hash(dto.password, 7);

    const createdUser = await this.prisma.userRegister.create({
      data: dto,
    });
    const token = generateAccessToken(createdUser.id, '1h');
    return {
      token,
    };
  }
  async sendEmail(dto: tokenDto) {
    const { user, id } = await verifyToken(
      dto.token,
      'userRegister',
      this.prisma,
    );
    const code = Math.floor(Math.random() * 8999) + 1000;
    const emailSender = new Emailsend();
    const bcryptCode = await bcrypt.hash(code.toString(), 7);
    await emailSender.sendmessage({
      emailUser: user.email,
      num: code.toString(),
    });

    await this.prisma.userRegister.update({
      where: {
        id: id.trim(),
      },
      data: {
        code: `${bcryptCode}`,
      },
    });

    return 'all good';
  }
  async checkAndRegister(dto: checkAndRegisterDto) {
    const { user, id } = await verifyToken(
      dto.token,
      'userRegister',
      this.prisma,
    );

    const validPassword = bcrypt.compareSync(dto.code, user.code);
    if (!validPassword) {
      throw new NotFoundException('The password entered is incorrect');
    }

    const createdUser = await this.prisma.users.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        lunchId: [],
        breakfastId: [],
        dinnerId: [],
        lunchDay: '',
        breakfastDay: '',
        dinnerDay: '',
        breakfastCalories: 0,
        dinnerCalories: 0,
        lunchCalories: 0,
      },
    });
    await this.prisma.userRegister.delete({
      where: {
        id: id,
      },
    });
    const token = generateAccessToken(createdUser.id, '365d');

    return { token };
  }
}
