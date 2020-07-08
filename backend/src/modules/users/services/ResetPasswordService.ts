import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUserRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUsersTokenRepository';
import AppError from '@shared/errors/AppErros';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { compare } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUserTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findBytoken(token);
    if (!userToken) {
      throw new AppError('User token does not exist!');
    }
    const user = await this.userRepository.findById(userToken?.user_id);
    if (!user) {
      throw new AppError('User does not exist!');
    }
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}
export default ResetPasswordService;
