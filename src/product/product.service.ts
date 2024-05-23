import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { addProductDto, PageDto, ProductDto } from './product.dto';
import * as jwt from 'jsonwebtoken';
import { NotFoundException } from '@nestjs/common';
import verifyToken from 'middleware/verifyToken';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ProductDto) {
    await this.prisma.product.createMany({ data: dto.products });
    return 'all good';
  }
  async get(page) {
    const Product = await this.prisma.product.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });
    return;
  }
  async addProduct(dto: addProductDto) {
    const { user } = await verifyToken(dto.token, 'users', this.prisma);
    var currentDate = new Date();
    if (dto.mealTime == 'dinner') {
      const updatedUser = await this.prisma.users.update({
        where: { id: user.id },
        data: { dinnerId: dto.id, dinnerDay: currentDate.getDate().toString() },
      });
    }
    if (dto.mealTime == 'lunch') {
      const updatedUser = await this.prisma.users.update({
        where: { id: user.id },
        data: { lunchId: dto.id, lunchDay: currentDate.getDate().toString() },
      });
    }
    if (dto.mealTime == 'breakfast') {
      const updatedUser = await this.prisma.users.update({
        where: { id: user.id },
        data: {
          breakfastId: dto.id,
          breakfastDay: currentDate.getDate().toString(),
        },
      });
    }
    return 'all good';
  }
}
