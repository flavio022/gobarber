import AppError from '@shared/errors/AppErros';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUsersService from '../services/AuthenticateUserService';
import CreateUsersService from '../services/CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });
    const response = await authenticateUsersService.execute({
      email: 'denegu@gmail.com',
      password: '342434',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUsersService.execute({
        email: 'denegu@gmail.com',
        password: '342434',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUserService.execute({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });

    expect(
      authenticateUsersService.execute({
        email: 'denegu@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
