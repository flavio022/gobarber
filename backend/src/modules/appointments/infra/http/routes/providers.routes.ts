import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';
import ProvidersMonthAvailability from '../controllers/ProvidersMonthAvailabilityController';
import ProvidersDayAvailability from '../controllers/ProvidersDayAvailabilityController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersRouter = Router();
const providersController = new ProvidersController();
const ProvidersMonthAvailabilityController = new ProvidersMonthAvailability();
const ProvidersDayAvailabilityController = new ProvidersDayAvailability();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required,
    },
  }),
  ProvidersMonthAvailabilityController.index,
);
providersRouter.get(
  '/:id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required,
    },
  }),
  ProvidersDayAvailabilityController.index,
);

export default providersRouter;
