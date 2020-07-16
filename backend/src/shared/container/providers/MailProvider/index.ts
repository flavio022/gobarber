import { container } from 'tsyringe';
import ImailProvider from './models/IMailProvider';
import mailConfig from '@config/mail';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SesMailProvider from './implementations/SesMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SesMailProvider),
};

container.registerInstance<ImailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
