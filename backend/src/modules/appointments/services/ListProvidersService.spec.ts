import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';
import AppError from '@shared/errors/AppErros';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'senhadojohn',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johndtre@gmail.com',
      password: 'senhadojohn',
    });
    const userLogge = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johndqua@gmail.com',
      password: 'senhadojohn',
    });

    const providers = await listProvidersService.execute({
      user_id: userLogge.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
