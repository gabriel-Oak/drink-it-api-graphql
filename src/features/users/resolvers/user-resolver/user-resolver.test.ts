import { mock, mockReset } from 'jest-mock-extended';
import IUserResolver, { AuthUserResponse, NewUser } from './types';
import UserResolver from './user-resolver';
import IHelloUsecase from '../../usecases/hello-usecase/types';
import { AuthenticateUserWrongPasswordError, IAuthenticateUserUsecase } from '../../usecases/authenticate-user/types';
import { ISignUserTokenUsecase } from '../../usecases/sign-user-token/types';
import { Left, Right } from '../../../../utils/types';
import User from '../../entities/user';
import HttpError from '../../../../utils/errors/http-error';
import { IValidateUserUsecase, ValidateUserError } from '../../usecases/validate-user/types';
import { IInsertUserUsecase, InsertUserAlreadyExist } from '../../usecases/insert-user/types';

describe('UserResolver Tests', () => {
  const usecaseMock = mock<IHelloUsecase>();
  const authUsecaseMock = mock<IAuthenticateUserUsecase>();
  const signTokenUsecaseMock = mock<ISignUserTokenUsecase>();
  const validateUsecaseMock = mock<IValidateUserUsecase>();
  const insertUsecaseMock = mock<IInsertUserUsecase>();

  const resolver: IUserResolver = new UserResolver(
    usecaseMock,
    authUsecaseMock,
    signTokenUsecaseMock,
    validateUsecaseMock,
    insertUsecaseMock,
  );

  beforeEach(() => {
    mockReset(usecaseMock);
    mockReset(authUsecaseMock);
    mockReset(signTokenUsecaseMock);
    mockReset(validateUsecaseMock);
    mockReset(insertUsecaseMock);

    signTokenUsecaseMock.execute
      .mockImplementation(() => 'sdhifuhsdiugsdf.udsuygsdyugysdf.dsuhfisdh');
  });

  it('Should return hello world', async () => {
    usecaseMock.execute.mockImplementationOnce(() => 'OMG DID IT REALLY WORK!?');
    const result = await resolver.hello();

    expect(result).toBe('OMG DID IT REALLY WORK!?');
  });

  it('Should return auth error', async () => {
    authUsecaseMock.execute
      .mockImplementation(async () => new Left(new AuthenticateUserWrongPasswordError()));
    const result = await resolver.authenticateUser('jorge@gmail.com', '123456');

    expect(result).toBeInstanceOf(HttpError);
  });

  it('Should return authenticated user', async () => {
    authUsecaseMock.execute.mockImplementation(async () => new Right(mock<User>()));
    const result = await resolver.authenticateUser('jorge@gmail.com', '123456');

    expect(result).toBeInstanceOf(AuthUserResponse);
  });

  it('Should return paylod invalid creating user', async () => {
    validateUsecaseMock.execute
      .mockImplementation(() => new Left(new ValidateUserError('Too dam hot')));
    const result = await resolver.createUser(mock<NewUser>()) as HttpError;

    expect(result.statusCode).toBe(400);
  });

  it('Should return user already exists', async () => {
    validateUsecaseMock.execute.mockImplementation(() => new Right(null));
    insertUsecaseMock.execute
      .mockImplementation(async () => new Left(new InsertUserAlreadyExist()));
    const result = await resolver.createUser(mock<NewUser>()) as HttpError;

    expect(result.statusCode).toBe(409);
  });

  it('Should return user and auth', async () => {
    validateUsecaseMock.execute.mockImplementation(() => new Right(null));
    insertUsecaseMock.execute.mockImplementation(async () => new Right(mock<User>()));
    const result = await resolver.createUser(mock<NewUser>());

    expect(result).toBeInstanceOf(AuthUserResponse);
  });

  // it('Should decode user', async () => {
  //   decodeUserTokenMock.execute.mockImplementation(async () => new Right(userMock));
  //   await controller.decode({ ...requestMock, headers: { auth } }, replyMock);
  //   expect(replyMock.send).toHaveBeenCalledWith(userMock.getProps());
  // });

  // it('Should return invalid auth', async () => {
  //   const error = new DecodeUserInvalidTokenError();
  //   decodeUserTokenMock.execute
  //     .mockImplementation(async () => new Left(error));
  //   await controller.decode({ ...requestMock, headers: { auth } }, replyMock);
  //   expect(replyMock.send).toHaveBeenCalledWith(new HttpError({ ...error, statusCode: 400 }));
  //   expect(replyMock.code).toHaveBeenCalledWith(400);
  // });

  // it('Should return decode user not found', async () => {
  //   const error = new DecodeUserNotFoundError();
  //   decodeUserTokenMock.execute
  //     .mockImplementation(async () => new Left(error));
  //   await controller.decode({ ...requestMock, headers: { auth } }, replyMock);
  //   expect(replyMock.send).toHaveBeenCalledWith(new HttpError({ ...error, statusCode: 404 }));
  //   expect(replyMock.code).toHaveBeenCalledWith(404);
  // });

  // it('Should handle datasource error', async () => {
  //   const error = new InternalUserDatasourceError('');
  //   decodeUserTokenMock.execute
  //     .mockImplementation(async () => new Left(error));
  //   await controller.decode({ ...requestMock, headers: { auth } }, replyMock);
  //   expect(replyMock.send).toHaveBeenCalledWith(new HttpError(error));
  //   expect(replyMock.code).toHaveBeenCalledWith(500);
  // });
});
