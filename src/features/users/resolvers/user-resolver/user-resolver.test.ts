import { mock, mockReset } from 'jest-mock-extended';
import IUserResolver, { AuthUserResponse } from './types';
import UserResolver from './user-resolver';
import IHelloUsecase from '../../usecases/hello-usecase/types';
import { AuthenticateUserWrongPasswordError, IAuthenticateUserUsecase } from '../../usecases/authenticate-user/types';
import { ISignUserTokenUsecase } from '../../usecases/sign-user-token/types';
import { Left, Right } from '../../../../utils/types';
import User from '../../entities/user';
import HttpError from '../../../../utils/errors/http-error';

describe('UserResolver Tests', () => {
  const usecaseMock = mock<IHelloUsecase>();
  const authUsecaseMock = mock<IAuthenticateUserUsecase>();
  const signTokenUsecaseMock = mock<ISignUserTokenUsecase>();
  const resolver: IUserResolver = new UserResolver(
    usecaseMock,
    authUsecaseMock,
    signTokenUsecaseMock,
  );

  beforeEach(() => {
    mockReset(usecaseMock);
    mockReset(authUsecaseMock);
    mockReset(signTokenUsecaseMock);
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
    authUsecaseMock.execute
      .mockImplementation(async () => new Right(mock<User>()));
    signTokenUsecaseMock.execute
      .mockImplementation(() => 'sdhifuhsdiugsdf.udsuygsdyugysdf.dsuhfisdh');
    const result = await resolver.authenticateUser('jorge@gmail.com', '123456');

    expect(result).toBeInstanceOf(AuthUserResponse);
  });
});
