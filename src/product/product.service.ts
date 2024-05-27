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
    return Product;
  }
  async addProduct(dto: addProductDto) {
    const { user } = await verifyToken(dto.token, 'users', this.prisma);
    const currentDate = new Date();
    const currentDay = currentDate.getDate().toString();
  
    if (dto.mealTime === 'dinner') {
      if (currentDay === user.dinnerDay) {
        const updatedDinnerIds = [...user.dinnerId, dto.id];
        await this.prisma.users.update({
          where: { id: user.id },
          data: { dinnerId: updatedDinnerIds,
            dinnerCalories:dto.calorie+user.dinnerCalories
           },
        });
      } else {
        await this.prisma.users.update({
          where: { id: user.id },
          data: {
            dinnerId: [dto.id],
            dinnerDay: currentDay,
            dinnerCalories :dto.calorie
          },
        });
      }
    }
  
    if (dto.mealTime === 'lunch') {
      if (currentDay === user.lunchDay) {
        const updatedLunchIds = [...user.lunchId, dto.id];
        await this.prisma.users.update({
          where: { id: user.id },
          data: { lunchId: updatedLunchIds,
            lunchCalories:dto.calorie+user.lunchCalories
           },
        });
      } else {
        await this.prisma.users.update({
          where: { id: user.id },
          data: {
            lunchId: [dto.id],
            lunchDay: currentDay,
            lunchCalories:dto.calorie
          },
        });
      }
    }
  
    if (dto.mealTime === 'breakfast') {
      if (currentDay === user.breakfastDay) {
        const updatedBreakfastIds = [...user.breakfastId, dto.id];
        await this.prisma.users.update({
          where: { id: user.id },
          data: { breakfastId: updatedBreakfastIds,
            breakfastCalories:dto.calorie+user.breakfastCalories
           },

        });
      } else {
        await this.prisma.users.update({
          where: { id: user.id },
          data: {
            breakfastId: [dto.id],
            breakfastDay: currentDay,
            breakfastCalories:dto.calorie
          },
        });
      }
    }
  
    return 'all good';
  }
  async getProduct(id) {
    console.log(id);
    const Product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    return Product;
  }
}
