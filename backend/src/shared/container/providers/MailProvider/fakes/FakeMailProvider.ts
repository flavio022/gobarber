import MailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailProviderDTO';

export default class FakeMailProvider implements MailProvider {
  private message: ISendMailDTO[] = [];
  public async sendMail(data: ISendMailDTO): Promise<void> {
    this.message.push(data);
  }
}
