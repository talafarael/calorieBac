import { Injectable } from '@nestjs/common';
import { GetProductsUserDto, GetUserDto } from './user.dto';
import * as jwt from 'jsonwebtoken';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import verifyToken from 'middleware/verifyToken';
@Injectable()
export class userService {
  constructor(private prisma: PrismaService) {}
  async user(dto: GetUserDto) {
    if (!dto.token) {
      throw new NotFoundException('Пользователь не авторизован');
    }

    const decodedData = jwt.verify(dto.token.trim(), process.env.SECRET);
    const id = decodedData.id;
    const User = await this.prisma.users.findFirst({
      where: {
        id: id.trim(),
      },
    });
    if (!User) {
      throw new NotFoundException('Пользователь не авторизован');
    }
    return User;
  }
  async getProductsUser(token) {
    console.log(token)
    const { user } = await verifyToken(token,'users',this.prisma);
    let dinner;
    let lunch;
    let breakfast;
    const currentDate = new Date();
    const currentDay = currentDate.getDate().toString();
    if (user.lunchDay === currentDay) {
      const products = await this.prisma.product.findMany({
        where: {
          id: {
            in: user.lunchId,
          },
        },
      });
      lunch = products;
    }
    if (user.dinnerDay === currentDay) {
      const products = await this.prisma.product.findMany({
        where: {
          id: {
            in: user.dinnerId,
          },
        },
      });
      dinner = products;
    }

    if (user.breakfastDay === currentDay) {
      const products = await this.prisma.product.findMany({
        where: {
          id: {
            in: user.breakfastId,
          },
        },
      });
      breakfast = products;
    }
    return { dinner, lunch, breakfast };
  }
}
