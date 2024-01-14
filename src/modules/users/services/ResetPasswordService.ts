import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';
import { IResetPassword } from '../domain/models/IResetPassword';
import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

@injectable()
class ResetPasswordService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,

    @inject(UserTokensRepository)
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.', 400);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.', 400);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 400);
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
