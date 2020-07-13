import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import AppointementController from '../controllers/AppointementsController';
import ProvidersAppointementController from '../controllers/ProvidersAppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const appointmentsRouter = Router();
const appointmentsController = new AppointementController();
const providersAppointmentsController = new ProvidersAppointementController();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
