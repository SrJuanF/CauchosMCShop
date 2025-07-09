import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;

export const HOST = `http://localhost:${PORT}`;

export const URI = process.env.MONGODB_URI;

export const MQURI = process.env.RABBITMQ_URI;

export const MERCADOPAGO_TOKEN = process.env.MERCADOPAGO_KEY;

export const SECRET_KEY = process.env.TOKEN_KEY;

export const OwAdm = process.env.OwA;

export const AMN = process.env.AM;

export const ENTMG = process.env.ENTMANG;
