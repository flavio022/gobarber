import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMothAvailability from '@modules/appointments/services/ListProviderMothAvailability';

export default class ProvidersMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.provider_id;

    const { month, year } = request.body;

    const listProvidersMonthAvailability = container.resolve(
      ListProviderMothAvailability,
    );
    const availability = await listProvidersMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
