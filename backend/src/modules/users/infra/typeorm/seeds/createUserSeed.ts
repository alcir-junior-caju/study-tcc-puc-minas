import { Factory, Seeder } from 'typeorm-seeding';

import User from '@modules/users/infra/typeorm/entities/User';

class CreateUserSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // await factory(User)().create({
    //   email: 'user@gmail.com.br'
    // });
    // await factory(User)().createMany(5);
  }
}

export default CreateUserSeed;
