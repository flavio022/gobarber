import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import AppointementController from '../controllers/AppointementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
const appointmentsRouter = Router();
const appointmentsController = new AppointementController();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
