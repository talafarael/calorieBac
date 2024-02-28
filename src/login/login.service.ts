import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}
  login(dto: LoginDto) {
    return this.prisma.users.findMany()
}
}