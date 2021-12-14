import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;

  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({ userId, avatarFilename }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user)
      throw new AppError({
        message: 'Only authenticated users can change avatar!',
        statusCode: 401
      });

    if (user.avatar) this.storageProvider.deleteFile(user.avatar);

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
