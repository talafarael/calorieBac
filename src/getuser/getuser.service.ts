import { Injectable } from '@nestjs/common';
import {GetuserDto} from './getuser.dto'
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class GetuserService {
  constructor(private prisma: PrismaService) {}
  async getuser(dto: GetuserDto) {}
}
