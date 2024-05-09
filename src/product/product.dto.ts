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
		category:string;
		
  @IsArray()
  vitamins: string[];
}

export class PageDto{
  @IsNumber()
  page: number;
}
export class ProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];
}
