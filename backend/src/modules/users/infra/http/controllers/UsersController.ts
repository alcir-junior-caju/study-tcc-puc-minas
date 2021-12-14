import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      body: { name, email, password }
    } = request;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(classToClass(user));
  }
}

export default UsersController;
