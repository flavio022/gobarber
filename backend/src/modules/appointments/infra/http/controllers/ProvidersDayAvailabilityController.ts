import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailability';

// http://localhost:3333/rota?year=2020&moth=5&day=20
export default class ProvidersDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;
    const { month, day, year } = request.query;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailability,
    );
    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      month: Number(month),
      day: Number(day),
      year: Number(year),
    });

    return response.json(availability);
  }
}
