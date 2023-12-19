import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import AppError from '@shared/errors/AppError';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject(ProductsRepository)
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.', 400);
    }

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
