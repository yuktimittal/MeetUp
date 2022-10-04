import dotenv from 'dotenv';
dotenv.config();

const secretKey = { secret: process.env.SECRET_KEY };
export default secretKey;
