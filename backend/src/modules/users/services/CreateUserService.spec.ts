import AppError from '@shared/errors/AppErros';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '../services/CreateUserService';
describe('CreateUser', () => {
  it('should be able to create new  user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUsersService.execute({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new  user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUsersService.execute({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });
    expect(
      createUsersService.execute({
        name: 'Flavio',
        email: 'denegu@gmail.com',
        password: '342434',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
