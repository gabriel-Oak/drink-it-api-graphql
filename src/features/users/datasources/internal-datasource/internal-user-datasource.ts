import { Repository } from 'typeorm';
import { inject } from 'inversify';
import { Left, Right } from '../../../../utils/types';
import User from '../../entities/user';
import { IInternalUserDatasource, InternalUserDatasourceError } from './types';
import Injectable from '../../../../utils/decorators/injectable';
import { ILoggerService } from '../../../../utils/services/logger-service/types';
import { IError } from '../../../../utils/services/cache-service/types';

@Injectable('IInternalUserDatasource')
export default class InternalUserDatasource implements IInternalUserDatasource {
  constructor(
    @inject('Repository<User>') private readonly userRepository: Repository<User>,
    @inject('ILoggerService') private readonly logger: ILoggerService,
  ) { }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as IError).message || `Oops, sorry got an error searching for ${email}`,
        { ...(e as IError), email },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findByEmailOrUsername(query: { username: string; email: string; }) {
    try {
      const user = await this.userRepository.findOneBy([
        { email: query.email },
        { username: query.username },
      ]);
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as IError).message || `Oops, sorry got an error searching for ${query.email} ${query.username}`,
        { ...(e as IError), query },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findById(userId: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      return new Right(user);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as IError).message || `Oops, sorry got an error searching for id${userId}`,
        { ...(e as IError), userId },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async save(user: User) {
    try {
      const result = await this.userRepository.save(user);
      result.password = undefined;
      return new Right(result);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as IError).message || `Oops, sorry got an error saving user${user.name}`,
        { ...(e as IError), user },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async update(user: User) {
    try {
      await this.userRepository.update(user.id!, user);
      return new Right(null);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as IError).message || `Oops, sorry got an error saving user${user.name}`,
        { ...(e as IError), user },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async remove(userId: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new Error(`Oops, user ${userId} not found, might be already deleted`);

      const result = await this.userRepository.remove(user);
      return new Right(result);
    } catch (e) {
      const error = new InternalUserDatasourceError(
        (e as IError).message || `Oops, sorry got an error searching for id${userId}`,
        { ...(e as IError), userId },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }
}
