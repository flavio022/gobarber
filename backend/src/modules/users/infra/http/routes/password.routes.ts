import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const passwordRouter = Router();

passwordRouter.post('/forgot', resetPasswordController.create);
passwordRouter.post('/reset', forgotPasswordController.create);
export default passwordRouter;
