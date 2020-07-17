import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;
    console.log(request.body);
    const listProviders = container.resolve(ListProvidersAppointmentsService);
    const providers = await listProviders.execute({
      day,
      month,
      provider_id,
      year,
    });

    return response.json(providers);
  }
}
