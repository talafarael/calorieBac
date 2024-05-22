import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

// Create an instance of the Prisma client
const prisma = new PrismaClient();
type PrismaService = {
  prismaService: any;
};

async function verifyToken(
  token: string,
  func: string,
): Promise<{ user: any; id: string }> {
  try {
    console.log('aaaaa');
    if (!token) {
      throw new Error('Пользователь не авторизован');
    }

    if (!process.env.SECRET) {
      throw new Error('Переменная окружения SECRET не определена');
    }

    const decodedData = jwt.verify(token, process.env.SECRET) as { id: string };
    const id = decodedData.id;
    console.log(id);
    let user
    if('users'==func){
    user = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });}
    if('users'==func){
      user = await prisma.userRegister.findFirst({
        where: {
          id: id,
        },
      });}
    if (!user) {
      throw new Error('Пользователь с данным идентификатором не найден');
    }

    return { user, id };
  } catch (error) {
    throw new Error('Невозможно верифицировать токен или найти пользователя');
  }
}

export default verifyToken;
