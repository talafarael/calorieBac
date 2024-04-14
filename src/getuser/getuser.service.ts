import { Injectable } from '@nestjs/common';
import {GetuserDto} from './getuser.dto'
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class GetuserService {
  constructor(private prisma: PrismaService) {}
  async getuser(dto: GetuserDto) {
    if (!dto.token) {
		
      throw new Error( "Пользователь не авторизован")
		}

    const decodedData = jwt.verify(dto.token,process.env.SECRET);
   const id = decodedData.id;
   const User = await this.prisma.users.findFirst({
    where:{
     id: id.trim()
  }
  });
   if (!User) {
    throw new Error( "Пользователь не авторизован")
   }
   return User
  }
}
