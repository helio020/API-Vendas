import { DataSource } from 'typeorm';
import { CreateProducts1702493784655 } from './migrations/1702493784655-CreateProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '43710',
  database: 'apivendas',
  entities: [],
  migrations: [CreateProducts1702493784655],
});
