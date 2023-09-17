import User from '../../../features/users/entities/user';
import HttpError from '../../errors/http-error';

export default interface IContext {
  headers: {
    authorization: string;
    [key: string]: string;
  },
  user: User;
  authError?: HttpError;
}
