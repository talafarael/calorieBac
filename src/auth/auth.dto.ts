import { IsString} from 'class-validator';

export class RegisterDto {
	@IsString()
	email:string
	password:string


}
export class LoginDto{
	@IsString()
	name:string
	email:string
	password:string
}