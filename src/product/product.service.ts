import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PageDto, ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ProductDto) {
    for (let i = 0; i < dto.products.length; i++) {
      await this.prisma.product.create({
        data: {
          name: dto.products[i].name,
          calories: dto.products[i].calories,
          img: dto.products[i].img,
          description: dto.products[i].description,
          vitamins: dto.products[i].vitamins,
          category: dto.products[i].category,
        },
      });
    }
    return 'all good';
  }
  async get(dto: PageDto){
    const Product = await this.prisma.product.findMany({
      take: 20,
      skip: (dto.page - 1) * 20
    });
    return Product
  }
}
