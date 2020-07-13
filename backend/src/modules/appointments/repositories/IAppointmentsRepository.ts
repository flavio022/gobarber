import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../../appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMothProviderDTO from '../../appointments/dtos/IFindAllInMothProviderDTO';

interface IApppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(data: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMothFromProvider(
    data: IFindAllInMothProviderDTO,
  ): Promise<Appointment[]>;
}

export default IApppointmentsRepository;
