import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import UserController from '../controllers/UserController';
const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const userAvatarcontroller = new UserAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarcontroller.update,
);

export default usersRouter;
