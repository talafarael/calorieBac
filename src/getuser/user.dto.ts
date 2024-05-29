import { IsString} from 'class-validator';

export class GetUserDto {
	@IsString()
	token:string
}
export class GetProductsUserDto{
	@IsString()
	token:string
}