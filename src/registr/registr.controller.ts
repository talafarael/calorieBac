import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegistrService } from './registr.service';
import { RegistrDto } from './registr.dto';

@Controller('registr')
export class RegistrController {
  constructor(private readonly registrService: RegistrService) {}

  @Post()
  @UsePipes(new ValidationPipe())
 async create(@Body() dto: RegistrDto) {


  return this.registrService.create(dto);
  }


   

 

 
}
