import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
		UsePipes,
		ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { PageDto, ProductDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: ProductDto) {
    return this.productService.create(dto);
  }
  @Get('get')
  @UsePipes(new ValidationPipe())
  get(@Body() dto: PageDto) {
    return this.productService.get(dto);
  }
}
