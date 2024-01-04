import { DataSource } from 'typeorm';
import { CreateProducts1702493784655 } from './migrations/1702493784655-CreateProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { CreateUsers1704388559610 } from './migrations/1704388559610-CreateUsers';
import User from '@modules/users/infra/typeorm/entities/User';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '43710',
  database: 'apivendas',
  entities: [Product, User],
  migrations: [CreateProducts1702493784655, CreateUsers1704388559610],
});
