import AppError from '@shared/errors/AppErros';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '../services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUsersService: CreateUsersService;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();
  fakeHashProvider = new FakeHashProvider();
  createUsersService = new CreateUsersService(
    fakeUsersRepository,
    fakeHashProvider,
  );
});
describe('CreateUser', () => {
  it('should be able to create new  user', async () => {
    const user = await createUsersService.execute({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create new  user with same email from another', async () => {
    await createUsersService.execute({
      name: 'Flavio',
      email: 'denegu@gmail.com',
      password: '342434',
    });
    await expect(
      createUsersService.execute({
        name: 'Flavio',
        email: 'denegu@gmail.com',
        password: '342434',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
