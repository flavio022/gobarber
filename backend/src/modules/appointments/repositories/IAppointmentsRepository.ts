import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '../../appointments/dtos/ICreateAppointmentDTO';
interface IApppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IApppointmentsRepository;
