import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import config from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const {
    headers: { authorization }
  } = request;

  if (!authorization)
    throw new AppError({ message: 'JWT token is missing!', statusCode: 401 });

  const [, token] = authorization.split(' ');

  const {
    jwt: { secret }
  } = config;

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub
    };

    return next();
  } catch {
    throw new AppError({ message: 'Invalid JWT token!', statusCode: 401 });
  }
}
