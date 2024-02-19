import 'dotenv/config';

interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'dodo_cruzeiro@hotmail.com',
      name: 'Hélio Ribeiro',
    },
  },
} as IMailConfig;
