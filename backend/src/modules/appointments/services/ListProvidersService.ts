import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppErros';
import { classToClass } from 'class-transformer';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[] | null> {
    let user = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!user) {
      const user = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });
      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(user),
      );
    }

    return user;
  }
}

export default ListProvidersService;
