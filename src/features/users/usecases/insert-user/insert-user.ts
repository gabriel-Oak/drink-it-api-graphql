import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { Left } from '../../../../utils/types';
import { IInternalUserDatasource } from '../../datasources/internal-datasource/types';
import User, { UserProps } from '../../entities/user';
import { IInsertUserUsecase, InsertUserAlreadyExist } from './types';

@Injectable('IInsertUserUsecase')
export default class InsertUserUsecase implements IInsertUserUsecase {
  constructor(
    @inject('IInternalUserDatasource') private readonly userDatasource: IInternalUserDatasource,
  ) { }

  async execute(user: Omit<UserProps, 'id'>) {
    const existResult = await this.userDatasource.findByEmailOrUsername(user);
    if (existResult.isError) return existResult;
    if (existResult.success) return new Left(new InsertUserAlreadyExist());

    const userResult = await this.userDatasource.save(new User(user));
    return userResult;
  }
}
