import 'reflect-metadata';
import { app } from './app';
import { dataSource } from '../typeorm';
import 'dotenv/config';

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3333);
});
