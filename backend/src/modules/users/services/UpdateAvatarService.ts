import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppErros';
import IUserRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!');
    }
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
