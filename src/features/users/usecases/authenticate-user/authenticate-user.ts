import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { Left, Right } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import {
  AuthenticateInvalidError,
  AuthenticateUserNotFoundError,
  AuthenticateUserWrongPasswordError,
  IAuthenticateUserUsecase,
  LoginPayload,
} from './types';

@Injectable('IAuthenticateUserUsecase')
export default class AuthenticateUserUsecase implements IAuthenticateUserUsecase {
  constructor(
    @inject('IInternalUserDatasource') private readonly userUsecase: IInternalUserDatasource,
  ) { }

  async execute(payload: LoginPayload) {
    if (!payload?.email || !payload?.password) return new Left(new AuthenticateInvalidError());

    const userResult = await this.userUsecase.findByEmail(payload.email);
    if (userResult.isError) return userResult;

    const { success: user } = userResult;
    if (!user) return new Left(new AuthenticateUserNotFoundError());

    if (await user.comparePasswords(payload.password)) {
      user.password = undefined;
      return new Right(user)
    }
    return new Left(new AuthenticateUserWrongPasswordError());
  }
}
