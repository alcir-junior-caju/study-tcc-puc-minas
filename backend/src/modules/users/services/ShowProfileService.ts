import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  userId: string;
}

@injectable()
class ShowProfileService {
  private usersRepository: IUsersRepository;

  constructor(@inject('UsersRepository') usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute({ userId }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError({ message: 'User not found!' });

    return user;
  }
}

export default ShowProfileService;
