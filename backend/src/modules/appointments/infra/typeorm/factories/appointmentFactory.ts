import { getYear } from 'date-fns';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

define(Appointment, (faker: typeof Faker) => {
  faker.locale = 'pt_BR';
  const currentDate = new Date();
  const year = getYear(currentDate);
  const month = faker.random.number({ min: 1, max: 12 });
  const day = faker.random.number({ min: 1, max: 31 });
  const hour = faker.random.number({ min: 8, max: 17 });
  const providerId = faker.random.uuid();
  const date = new Date(year, month + 1, day, hour - 3, 0, 0);

  const appointment = new Appointment();

  Object.assign(appointment, {
    provider_id: providerId,
    date
  });

  return appointment;
});
