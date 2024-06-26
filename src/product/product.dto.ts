import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ProductItemDto {
  @IsString()
  name: string;

  @IsString()
  calories: string;

  @IsString()
  img: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsArray()
  vitamins: string[];
}

export class PageDto {
  @IsNumber()
  page: number;
}
export class IdDto {
  @IsNumber()
  id: number;
}
export class ProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];
}
export class addProductDto {
  @IsString()
  token: string;
  @IsString()
  id: string;
  @IsString()
  mealTime: string;
  @IsString()
  calorie: string;
}
