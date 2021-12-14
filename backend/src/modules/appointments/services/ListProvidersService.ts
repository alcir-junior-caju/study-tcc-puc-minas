import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  userId: string;
}

@injectable()
class ListProvidersService {
  private userRepository: IUsersRepository;

  private cacheProvider: ICacheProvider;

  constructor(
    @inject('UsersRepository') userRepository: IUsersRepository,
    @inject('CacheProvider') cacheProvider: ICacheProvider
  ) {
    this.userRepository = userRepository;
    this.cacheProvider = cacheProvider;
  }

  public async execute({ userId }: IRequestDTO): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`
    );

    if (!users)
      users = await this.userRepository.findAll({
        exceptUserId: userId
      });

    await this.cacheProvider.save(
      `providers-list:${userId}`,
      classToClass(users)
    );

    return users;
  }
}

export default ListProvidersService;
