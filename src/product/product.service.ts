import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PageDto, ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(dto: ProductDto) {
    await this.prisma.product.createMany({ data: dto.products });
    return 'all good';
  }
  async get(page) {
    console.log('d');
    const Product = await this.prisma.product.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });
    return Product;
  }
  async addProduct(){
    
  } 
}
