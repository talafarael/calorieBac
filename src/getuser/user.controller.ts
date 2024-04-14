import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { userService } from './user.service';
import { GetuserDto } from './user.dto';

@Controller('getuser')
export class userController {
  constructor(private readonly userService: userService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: GetuserDto) {
    return this.userService.getuser(dto);
  }
}
