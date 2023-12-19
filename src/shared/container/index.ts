import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
