import ISendMailDTO from '../dtos/ISendMailProviderDTO';
export default interface ImailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
