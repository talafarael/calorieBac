import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { GetuserService } from './getuser.service';
import {GetuserDto} from './getuser.dto'

@Controller('getuser')
export class GetuserController {
  constructor(private readonly getuserService: GetuserService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto:GetuserDto ) {
    return this.getuserService.getuser(dto);
  }
}
