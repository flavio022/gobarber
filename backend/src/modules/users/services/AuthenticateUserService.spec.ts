import AppError from '@shared/errors/AppErros';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUsersService from '../services/AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUsersService: AuthenticateUsersService;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  fakeHashProvider = new FakeHashProvider();

  authenticateUsersService = new AuthenticateUsersService(
    fakeUsersRepository,
    fakeHashProvider,
  );
});
describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
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
    await expect(
      authenticateUsersService.execute({
        email: 'denegu@gmail.com',
        password: '342434',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });

    await expect(
      authenticateUsersService.execute({
        email: 'denegu@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
