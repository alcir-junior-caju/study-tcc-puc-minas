import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const {
      query: { month, year },
      params: { id: providerId }
    } = request;

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId,
      month: Number(month),
      year: Number(year)
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
