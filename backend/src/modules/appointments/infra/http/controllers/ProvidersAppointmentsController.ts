import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listAppointments = container.resolve(
      ListProvidersAppointmentsService,
    );
    const appointments = await listAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(classToClass(appointments));
  }
}
