import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const listProvidersService = container.resolve(ListProvidersService);

    const providers = await listProvidersService.execute({
      userId
    });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
