import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { IShowProfile } from '../domain/models/IShowProfile';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowProfileService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IShowProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    return user;
  }
}

export default ShowProfileService;
