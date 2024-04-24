import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Patch,
  Get
} from '@nestjs/common';
import { userService } from './user.service';
import { GetuserDto } from './user.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: userService) {}
  @Get('get')
  @UsePipes(new ValidationPipe())
 
  async create(@Body() dto: GetuserDto) {
    return this.userService.user(dto);
  }
}
