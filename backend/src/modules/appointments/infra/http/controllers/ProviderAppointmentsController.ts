import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const providerId = request.user.id;
    const {
      query: { day, month, year }
    } = request;

    const listProviderAppointments = container.resolve(
      ListProviderAppointments
    );

    const appointments = await listProviderAppointments.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return response.json(classToClass(appointments));
  }
}

export default ProviderAppointmentsController;
