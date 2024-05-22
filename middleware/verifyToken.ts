import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// Create an instance of the Prisma client
const prisma = new PrismaClient();


async function verifyToken(
  token: string,
  func: string,
  prismaService:PrismaService
): Promise<{ user: any; id: string }> {
  try {
    
    if (!token) {
      throw new Error('Пользователь не авторизован');
    }

    if (!process.env.SECRET) {
      throw new Error('Переменная окружения SECRET не определена');
    }

    const decodedData = jwt.verify(token,process.env.SECRET) as { id: string };
    const id = decodedData.id;
    console.log(id);
    let user
    if('users'==func){
      console.log('aaaaaaaaaaaaaa')
    user = await prismaService.users.findFirst({
      where: {
        id: id,
      },
    });}
    if('userss'==func){
      user = await prismaService.userRegister.findFirst({
        where: {
          id: id,
        },
      });}
    if (!user) {
      throw new Error('Пользователь с данным идентификатором не найден');
    }

    return { user, id };
  } catch (error) {
    throw new NotFoundException('Невозможно верифицировать токен или найти пользователя');
  }
}

export default verifyToken;
