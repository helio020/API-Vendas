import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    try {
      const listProducts = container.resolve(ListProductService);

      const products = await listProducts.execute({ page, limit });

      return response.json(products);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const showProduct = container.resolve(ShowProductService);

      const product = await showProduct.execute({ id });

      return response.json(product);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    try {
      const createProduct = container.resolve(CreateProductService);

      const product = await createProduct.execute({ name, price, quantity });

      return response.json(product);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    try {
      const updateProduct = container.resolve(UpdateProductService);

      const product = await updateProduct.execute({
        id,
        name,
        price,
        quantity,
      });

      return response.json(product);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const deleteProduct = container.resolve(DeleteProductService);

      await deleteProduct.execute({ id });

      return response.json([]);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
