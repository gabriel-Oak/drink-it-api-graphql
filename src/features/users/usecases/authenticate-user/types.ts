import { Field, ObjectType } from 'type-graphql';
import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';
import User from '../../entities/user';

@ObjectType()
export class LoginPayload {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}

export class AuthenticateInvalidError extends BaseError {
  public readonly type = 'authenticate-invalid';

  constructor() { super('Oh looks like you didn\'t specify an email or a password :O'); }
}

export class AuthenticateUserNotFoundError extends BaseError {
  public readonly type = 'authenticate-user-not-found';

  constructor() { super('Sorry we couldn\'t find any user for this email =/'); }
}

export class AuthenticateUserWrongPasswordError extends BaseError {
  public readonly type = 'authenticate-user-wrong-password';

  constructor() { super('Wrong password, please try again ;)'); }
}

export type authenticateUserErrors = InternalUserDatasourceError
  | AuthenticateUserNotFoundError
  | AuthenticateUserWrongPasswordError
  | AuthenticateInvalidError;

export interface IAuthenticateUserUsecase {
  execute: (payload: LoginPayload) => Promise<Either<authenticateUserErrors, User>>
}
