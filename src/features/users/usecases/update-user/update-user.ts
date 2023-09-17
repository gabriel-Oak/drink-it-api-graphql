/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import User from '../../entities/user';
import { IUpdateUserUsecase, updateUserProps } from './types';
import { Right } from '../../../../utils/types';

@Injectable('IUpdateUserUsecase')
export default class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    @inject('IInternalUserDatasource') private readonly userDatasource: IInternalUserDatasource,
  ) { }

  async execute(user: User, payload: updateUserProps) {
    user.updateProps(payload);
    const result = await this.userDatasource.update(user);
    return result.isError ? result : new Right('Great, updated with success ;)');
  }
}
