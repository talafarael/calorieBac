import { IsString } from "class-validator";

export class RegistrDto{
	@IsString()
	name:string
	email:string
	password:string
}