import { Field, ObjectType } from 'type-graphql';
import User from '../../entities/user';
import HttpError from '../../../../utils/errors/http-error';

@ObjectType()
export class AuthUserResponse {
  @Field()
  public user!: User;

  @Field()
  public auth!: string;
}

export default interface IUserResolver {
  hello: () => Promise<string>;
  authenticateUser: (email: string, password: string) => Promise<HttpError | AuthUserResponse>;
}
