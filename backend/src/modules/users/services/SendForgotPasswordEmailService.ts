import path from 'path';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEMailService {
  private usersRepository: IUsersRepository;

  private mailProvider: IMailProvider;

  private userTokensRepository: IUserTokensRepository;

  constructor(
    @inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('MailProvider') mailProvider: IMailProvider,
    @inject('UserTokensRepository') userTokensRepository: IUserTokensRepository
  ) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.userTokensRepository = userTokensRepository;
  }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError({ message: 'User does not exists!' });

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
          assign: 'Equipe GoBarber'
        }
      }
    });
  }
}

export default SendForgotPasswordEMailService;
