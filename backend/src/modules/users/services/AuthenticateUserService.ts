import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import config from '@config/auth';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('HashProvider') hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    email,
    password
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user)
      throw new AppError({
        message: 'Incorrect email/password combination!',
        statusCode: 401
      });

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );
    if (!passwordMatched)
      throw new AppError({
        message: 'Incorrect email/password combination!',
        statusCode: 401
      });

    const {
      jwt: { secret, expiresIn }
    } = config;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;
