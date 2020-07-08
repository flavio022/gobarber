import { EntityRepository, Repository, getRepository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

@EntityRepository(UserToken)
class UserTokenRepository implements IUsersRepository {
  private ormRepository: Repository<UserToken>;
  constructor() {
    this.ormRepository = getRepository(UserToken);
  }
  public async findBytoken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });
    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokenRepository;
