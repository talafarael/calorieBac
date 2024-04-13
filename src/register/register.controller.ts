import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: RegisterDto) {
    return this.registerService.create(dto);
  }
}
