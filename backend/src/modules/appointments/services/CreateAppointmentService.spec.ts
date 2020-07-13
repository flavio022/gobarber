import AppError from '@shared/errors/AppErros';
import FakeAppointementsRepository from '../repositories/fakes/FakeAppointementsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';
describe('CreateAppointment', () => {
  let createAppointment: CreateAppointmentService;
  let fakeAppointementsRepository: FakeAppointementsRepository;
  let fakeNotificationRepository: FakeNotificationsRepository;
  beforeEach(() => {
    fakeAppointementsRepository = new FakeAppointementsRepository();
    fakeNotificationRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointementsRepository,
      fakeNotificationRepository,
    );
  });
  it('should be able to create new  appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '121324234',
      user_id: '1232132',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121324234');
  });

  it('should not be able to create two  appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });
    const appointmentDate = new Date(2020, 8, 10, 12);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121324234',
      user_id: '31312',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121324234',
        user_id: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '12343',
        provider_id: '12343',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '21321',
        provider_id: '21321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 8, 11, 7),
        user_id: '21321',
        provider_id: '2132221',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 8, 11, 18),
        user_id: '21321',
        provider_id: '21444321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 8, 11, 7),
        user_id: '21321',
        provider_id: '2132221',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 8, 11, 18),
        user_id: '21321',
        provider_id: '21444321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
