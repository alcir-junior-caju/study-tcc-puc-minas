import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequestDTO {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
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
    userId,
    name,
    email,
    password,
    oldPassword
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError({ message: 'User not found!' });

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId)
      throw new AppError({ message: 'Email already in use!' });

    user.name = name;
    user.email = email;

    if (password && !oldPassword)
      throw new AppError({
        message: 'You need to inform the old password to set a new password!'
      });

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password
      );

      if (!checkOldPassword)
        throw new AppError({ message: 'Old password does not match!' });

      user.password = await this.hashProvider.generateHash(password);
    }

    return user;
  }
}

export default UpdateProfileService;
