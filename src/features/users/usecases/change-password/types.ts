import { Field, InputType } from 'type-graphql';
import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { InternalUserDatasourceError } from '../../datasources/internal-datasource/types';

export class ChangePasswordInvalidPassError extends BaseError {
  public readonly type = 'change-password-invalid-pass';

  constructor(message?: string) {
    super(message ?? 'Invalid passwords informed, check if its spelled right and try again');
  }
}

export class ChangePasswordInvalidOldPassError extends ChangePasswordInvalidPassError {
  constructor() {
    super('Invalid old password, check if its spelled right and try again');
  }
}

export type changePasswordErrors = InternalUserDatasourceError
  | ChangePasswordInvalidPassError
  | ChangePasswordInvalidOldPassError;

@InputType()
export class ChangePassword {
  @Field() oldPassword!: string;

  @Field() newPassword!: string;
}

export interface ChangePasswordPayload extends ChangePassword {
  userId: string;
}

export interface IChangePasswordUsecase {
  execute: (payload: ChangePasswordPayload) => Promise<Either<changePasswordErrors, string>>
}
