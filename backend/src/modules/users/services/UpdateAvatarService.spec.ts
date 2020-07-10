import AppError from '@shared/errors/AppErros';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateAvatarServicer from './UpdateAvatarService';

describe('UpdateUserAvatar', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeStorageProvider: FakeStorageProvider;

  let updateAvatarservice: UpdateAvatarServicer;
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateAvatarservice = new UpdateAvatarServicer(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'senhadojohn',
    });

    await updateAvatarservice.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateAvatarservice.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be delete to update user avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'senhadojohn',
    });

    await updateAvatarservice.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });
    await updateAvatarservice.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
