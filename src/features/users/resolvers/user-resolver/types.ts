import { Field, InputType, ObjectType } from 'type-graphql';
import { UserProps } from '../../entities/user';
import HttpError from '../../../../utils/errors/http-error';
import IContext from '../../../../utils/middlewares/context/types';
import { ChangePassword } from '../../usecases/change-password/types';

@ObjectType()
export class UserResponse implements Omit<UserProps, 'password'> {
  @Field() id!: string;

  @Field() name!: string;

  @Field() email!: string;

  constructor(props: Omit<UserProps, 'password'>) {
    Object.assign(this, {
      ...props,
      password: undefined,
    });
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

  @Field() password!: string;
}

@InputType()
export class UpdateUser implements Partial<Omit<UserProps, 'id' | 'password'>> {
  @Field({ nullable: true })
  public name?: string;

  @Field({ nullable: true })
  public email?: string;
}

export default interface IUserResolver {
  hello: () => Promise<string>;
  authenticateUser: (email: string, password: string) => Promise<HttpError | AuthUserResponse>;
  createUser: (newUser: NewUser) => Promise<HttpError | AuthUserResponse>;
  refreshUserToken: (ctx: IContext) => Promise<AuthUserResponse>;
  changeUserPassword: (payload: ChangePassword, ctx: IContext) => Promise<HttpError | string>;
  updateUser: (user: UpdateUser, ctx: IContext) => Promise<HttpError | string>;
}
