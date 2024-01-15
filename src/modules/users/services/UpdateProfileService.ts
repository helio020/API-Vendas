import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

@injectable()
class UpdateProfileService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 400);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.', 400);
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
        400,
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 400);
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
