import { IsString } from 'class-validator';

export class GetuserDto {
  @IsString()
  token: string;
}
