import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updatedUserAvart = container.resolve(UpdateAvatarService);
    const user = await updatedUserAvart.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}
