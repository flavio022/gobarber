import AppError from '@shared/errors/AppErros';
import FakeAppointementsRepository from '../repositories/fakes/FakeAppointementsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
describe('CreateAppointment', () => {
  let createAppointment: CreateAppointmentService;
  let fakeAppointementsRepository: FakeAppointementsRepository;
  beforeEach(() => {
    fakeAppointementsRepository = new FakeAppointementsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointementsRepository,
    );
  });
  it('should be able to create new  appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121324234',
      user_id: '1232132',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121324234');
  });

  it('should not be able to create two  appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121324234',
      user_id: '31312',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121324234',
        user_id: '231321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
test('sum two numbers', () => {
  expect(1 + 2).toBe(3);
});
