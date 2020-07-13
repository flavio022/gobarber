import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

/*
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';
*/
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);
container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UserTokensRepository,
);
