import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenthicated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter
  .route('/')
  // .get(async (request, response) => {
  //   const appointments = await appointmentsRepository.find();
  //   // const appointments = appointmentsRepository.all();

  //   return response.json(appointments);
  // })
  .post(
    celebrate({
      [Segments.BODY]: {
        providerId: Joi.string().uuid().required(),
        date: Joi.date()
      }
    }),
    appointmentsController.create
  );

appointmentsRouter.route('/me').get(providerAppointmentsController.index);

export default appointmentsRouter;
