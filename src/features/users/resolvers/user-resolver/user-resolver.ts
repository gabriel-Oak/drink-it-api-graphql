import { Arg, Mutation, Query } from 'type-graphql';
import { inject } from 'inversify';
import IUserResolver, { AuthUserResponse, NewUser, UserResponse } from './types';
import IHelloUsecase from '../../usecases/hello-usecase/types';
import Resolver from '../../../../utils/decorators/resolver';
import { IAuthenticateUserUsecase } from '../../usecases/authenticate-user/types';
import HttpError from '../../../../utils/errors/http-error';
import { ISignUserTokenUsecase } from '../../usecases/sign-user-token/types';
import { IValidateUserUsecase } from '../../usecases/validate-user/types';
import { IInsertUserUsecase } from '../../usecases/insert-user/types';

@Resolver()
export default class UserResolver implements IUserResolver {
  constructor(
    @inject('IHelloUsecase') private readonly helloUsecasse: IHelloUsecase,
    @inject('IAuthenticateUserUsecase') private readonly authUserUsecase: IAuthenticateUserUsecase,
    @inject('ISignUserTokenUsecase') private readonly signUserTokenUsecase: ISignUserTokenUsecase,
    @inject('IValidateUserUsecase') private readonly validateUserUsecase: IValidateUserUsecase,
    @inject('IInsertUserUsecase') private readonly insertUserUsecase: IInsertUserUsecase,
  ) { }

  @Query(() => String)
  async hello() {
    return this.helloUsecasse.execute();
  }

  @Query(() => AuthUserResponse)
  async authenticateUser(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const authResult = await this.authUserUsecase.execute({ email, password });

    if (authResult.isError) {
      const error = new HttpError({
        ...authResult.error,
        statusCode: {
          'authenticate-user-not-found': 404,
          'authenticate-user-wrong-password': 403,
          'authenticate-invalid': 400,
        }[String(authResult.error.type)] ?? 500,
      });
      return error;
    }

    const { success: user } = authResult;
    delete user.password;
    const auth = this.signUserTokenUsecase.execute(user);
    return new AuthUserResponse({
      user: new UserResponse(user),
      auth,
    });
  }

  @Mutation(() => AuthUserResponse)
  async createUser(
    @Arg('newUser') newUser: NewUser,
  ) {
    const validate = this.validateUserUsecase.execute(newUser);
    if (validate.isError) {
      return new HttpError({
        ...validate.error,
        statusCode: 400,
      });
    }

    const insertResult = await this.insertUserUsecase.execute(newUser);
    if (insertResult.isError) {
      const error = new HttpError(insertResult.error);
      if (insertResult.error.type === 'insert-user-already-exist') error.statusCode = 409;
      return error;
    }

    const { success: user } = insertResult;
    delete user.password;
    const auth = this.signUserTokenUsecase.execute(user);
    return new AuthUserResponse({
      user: new UserResponse(user),
      auth,
    });
  }
}
