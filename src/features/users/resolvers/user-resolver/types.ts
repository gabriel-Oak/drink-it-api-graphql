import { Field, InputType, ObjectType } from 'type-graphql';
import { UserProps } from '../../entities/user';
import HttpError from '../../../../utils/errors/http-error';

@ObjectType()
export class UserResponse implements Omit<UserProps, 'password'> {
  @Field() id!: string;

  @Field() name!: string;

  @Field() email!: string;

  @Field() username!: string;

  constructor(props: Omit<UserProps, 'password'>) {
    Object.assign(this, props);
  }
}

@ObjectType()
export class AuthUserResponse {
  @Field() user!: UserResponse;

  @Field() auth!: string;

  constructor(props: AuthUserResponse) {
    Object.assign(this, props);
  }
}

@InputType()
export class NewUser implements Omit<UserProps, 'id'> {
  @Field() name!: string;

  @Field() email!: string;

  @Field() username!: string;

  @Field() password!: string;
}

export default interface IUserResolver {
  hello: () => Promise<string>;
  authenticateUser: (email: string, password: string) => Promise<HttpError | AuthUserResponse>;
  createUser(newUser: NewUser): Promise<HttpError | AuthUserResponse>;
}
