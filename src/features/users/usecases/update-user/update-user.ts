import { Left } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import User from '../../entities/user';
import { IUpdateUserUsecase, UpdateUserInvalidPassError, updateUserProps } from './types';

export default class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    private readonly userDatasource: IInternalUserDatasource,
  ) { }

  async execute(user: User, payload: updateUserProps) {
    const passIsValid = payload.password && await user.comparePasswords(payload.password);
    if (!passIsValid) return new Left(new UpdateUserInvalidPassError());

    user.updateProps(payload);
    return this.userDatasource.update(user);
  }
}
