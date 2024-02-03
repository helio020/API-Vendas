import ShowProfileService from '@modules/users/services/ShowProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { IUser } from '@modules/users/domain/models/IUser';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

interface CustomRequest extends Request {
  user: IUser;
}

export default class ProfileController {
  public async show(
    request: CustomRequest,
    response: Response,
  ): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(
    request: CustomRequest,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
