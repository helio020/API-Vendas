import { DataSource } from 'typeorm';
import { CreateProducts1702493784655 } from './migrations/1702493784655-CreateProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '43710',
  database: 'apivendas',
  entities: [Product],
  migrations: [CreateProducts1702493784655],
});
