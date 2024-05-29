import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
  Query,
  
} from '@nestjs/common';
import { userService } from './user.service';
import { GetProductsUserDto, GetUserDto } from './user.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: userService) {}
  @Post('get')
  @UsePipes(new ValidationPipe())
 
  get(@Body() dto: GetUserDto) {
    return this.userService.user(dto);
  }

  @Post('getProductsUser')
  @UsePipes(new ValidationPipe())
 
  getProductsUser(@Query('token') token: string) {
    return this.userService.getProductsUser(token);
  }
}
