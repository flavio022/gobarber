import { EntityRepository, MongoRepository, getMongoRepository } from 'typeorm';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import Notification from '../schemas/Notification';
import INotificationDTO from '@modules/notifications/dtos/INotificationDTO';

@EntityRepository(Notification)
class NotificationRepository implements INotificationRepository {
  private ormRepository: MongoRepository<Notification>;
  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongobarber');
  }

  public async create({
    recipient_id,
    content,
  }: INotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipient_id,
      content,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationRepository;
