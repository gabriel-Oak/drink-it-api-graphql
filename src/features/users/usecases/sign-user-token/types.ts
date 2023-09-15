import User from '../../entities/user';

export interface ISignUserTokenUsecase {
  execute: (user: User) => string;
}
