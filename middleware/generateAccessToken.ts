import * as jwt from 'jsonwebtoken';


export const generateAccessToken = (id:string) => {
	const playold = {
			id,
	};
	return jwt.sign(playold, process.env.SECRET, {  expiresIn: '365d' });
};