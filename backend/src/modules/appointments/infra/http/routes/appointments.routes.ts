import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AppointementController from '../controllers/AppointementsController';
import ProvidersAppointementController from '../controllers/ProvidersAppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const appointmentsRouter = Router();
const appointmentsController = new AppointementController();
const providersAppointmentsController = new ProvidersAppointementController();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
