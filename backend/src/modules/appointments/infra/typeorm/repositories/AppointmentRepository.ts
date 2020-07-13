import { EntityRepository, Repository, getRepository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMothProviderDTO from '@modules/appointments/dtos/IFindAllInMothProviderDTO';

@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date: date, provider_id },
    });

    return findAppointment;
  }

  public async findAllInMothFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMothProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    console.log('aqui');
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
