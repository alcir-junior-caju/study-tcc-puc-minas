import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenthicated from '@modules/users/infra/http/middlewares/ensureAuthenthicated';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenthicated);

providersRouter.route('/').get(providersController.index);
providersRouter.route('/:id/month-availability').get(
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  providerMonthAvailabilityController.index
);
providersRouter.route('/:id/day-availability').get(
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  providerDayAvailabilityController.index
);

export default providersRouter;
