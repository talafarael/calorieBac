import { IsString} from 'class-validator';

export class LoginDto {
	@IsString()
	email:string
	password:string


}
export class RegisterDto{
	@IsString()
	name:string
	email:string
	password:string
}
export class tokenDto{
	@IsString()
	token:string
}
export class checkAndRegisterDto{
	@IsString()
	code:any
	token:string

}