import { string } from 'prop-types';

interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name:string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'flaviodanilo@donationforeveryone.com',
      name: 'Flavio Danilo',
    },
  },
} as IMailConfig;
