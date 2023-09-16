import jwt from 'jsonwebtoken';
import { inject } from 'inversify';
import User from '../../entities/user';
import { ISignUserTokenUsecase } from './types';
import { JWT_SECRET } from '../../../../utils/constants';
import { ICacheService } from '../../../../utils/services/cache-service/types';
import Injectable from '../../../../utils/decorators/injectable';

@Injectable('ISignUserTokenUsecase')
export default class SignUserTokenUsecase implements ISignUserTokenUsecase {
  constructor(
    @inject('ICacheService') private readonly cache: ICacheService,
  ) { }

  execute(user: User) {
    const newUser = new User({ ...user, password: undefined });
    this.cache.set(`user:${user.id!}`, newUser);

    return jwt.sign(newUser.getProps(), JWT_SECRET, { expiresIn: '5 days' });
  }
}
