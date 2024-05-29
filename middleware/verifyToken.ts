import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// Create an instance of the Prisma client
const prisma = new PrismaClient();

async function verifyToken(
  token: string,
  serves: string,
  prismaService: PrismaService,
): Promise<{ user: any; id: string }> {
  try {
    console.log(token)
    if (!token) {
      throw new NotFoundException('Пользователь не авторизован');
    }

    const decodedData = jwt.verify(token, process.env.SECRET) as { id: string };
    const id = decodedData.id;

    let user;
    if ('users' == serves) {
      user = await prismaService.users.findFirst({
        where: {
          id: id,
        },
      });
    }

    if ('userRegister' === serves) {
      user = await prismaService.userRegister.findFirst({
        where: {
          id: id,
        },
      });
    }
    if (!user) {
      throw new NotFoundException(
        'The user with the given identifier was not found.',
      );
    }

    return { user, id };
  } catch (error) {
    throw new NotFoundException(
      'Невозможно верифицировать токен или найти пользователя',
    );
  }
}

export default verifyToken;
