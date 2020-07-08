import { uuid } from 'uuidv4';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUsersDTO';
import UsersToken from '../../infra/typeorm/entities/UserToken';

class FakeUsersTokenRepository implements IUsersTokenRepository {
  private userToken: UsersToken[] = [];
  public async generate(user_id: string): Promise<UsersToken> {
    const userToken = new UsersToken();
    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.userToken.push(userToken);
    return userToken;
  }
  public async findBytoken(token: string): Promise<UsersToken | undefined> {
    const userToken = this.userToken.find(
      findToken => findToken.token === token,
    );
    return userToken;
  }
}

export default FakeUsersTokenRepository;
