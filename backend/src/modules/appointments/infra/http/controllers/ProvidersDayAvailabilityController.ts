import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability';

export default class ProvidersDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, day, year } = request.body;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailability,
    );
    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(availability);
  }
}
