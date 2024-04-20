import jwt, { JwtPayload } from 'jsonwebtoken';
const { secret } = require('../config');


async function verifyToken(token: string) {
  try {
    if (!token) {
      throw new Error('Пользователь не авторизован');
    }
    console.log(secret);
    const decodedData = (await jwt.verify(token, secret)) as JwtPayload;
    const id = decodedData.id;
    const user =  await this.prisma.users.findFirst({
					where: {
						_id:id.trim()
					}
				})
    if (!user) {
      throw new Error('The user with this name does not exist');
    }
    return { user, id };
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export = verifyToken;
