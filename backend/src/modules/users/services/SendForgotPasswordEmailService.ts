import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUsersTokenRepository';
import AppError from '@shared/errors/AppErros';
import { template } from 'handlebars';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersTokenRepository')
    private usersTokenProvider: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exist!');
    }
    const { token } = await this.usersTokenProvider.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}:{{token}}',
        variables: {
          name: user.name,
          token: user.name,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
