import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { addProductDto, PageDto, ProductDto } from './product.dto';
import * as jwt from 'jsonwebtoken';
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
    const {user}=await verifyToken(dto.token,this.prisma)
    user.ProductsList.push(dto.product)
    return 'all good';
  }
}
