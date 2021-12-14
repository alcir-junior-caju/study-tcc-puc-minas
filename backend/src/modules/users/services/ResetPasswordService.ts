import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;

  private userTokensRepository: IUserTokensRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('UserTokensRepository') userTokensRepository: IUserTokensRepository,
    @inject('HashProvider') hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.userTokensRepository = userTokensRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken)
      throw new AppError({ message: 'User token does not exists.' });

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError({ message: 'User does not exists.' });

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate))
      throw new AppError({ message: 'Token expired' });

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
