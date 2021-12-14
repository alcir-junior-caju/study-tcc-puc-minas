import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenthicated from '@modules/users/infra/http/middlewares/ensureAuthenthicated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenthicated);

profileRouter
  .route('/')
  .put(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        oldPassword: Joi.string(),
        password: Joi.string(),
        passwordConfirmation: Joi.string().valid(Joi.ref('password'))
      }
    }),
    profileController.update
  )
  .get(profileController.show);

export default profileRouter;
