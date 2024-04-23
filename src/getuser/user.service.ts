import { Injectable } from '@nestjs/common';
import { GetuserDto } from './user.dto';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class userService {
  constructor(private prisma: PrismaService) {}
  async user(dto: GetuserDto) {
    if (!dto.token) {
      throw new Error('Пользователь не авторизован');
    }

    const decodedData = jwt.verify(dto.token, process.env.SECRET);
    const id = decodedData.id;
    const User = await this.prisma.users.findFirst({
      where: {
        id: id.trim(),
      },
    });
    if (!User) {
      throw new Error('Пользователь не авторизован');
    }
    console.log(User);
    return User;
  }
}
