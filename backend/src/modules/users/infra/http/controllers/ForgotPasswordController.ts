import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body;
      console.log(email);
      const sendForgotPasswordEmail = container.resolve(
        SendForgotPasswordEmailService,
      );
      console.log(sendForgotPasswordEmail);
      await sendForgotPasswordEmail.execute({
        email,
      });
      return response.status(204).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
