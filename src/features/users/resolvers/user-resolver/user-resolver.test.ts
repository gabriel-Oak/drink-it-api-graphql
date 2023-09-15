import { mock, mockReset } from 'jest-mock-extended';
import IUserResolver from './types';
import UserResolver from './user-resolver';
import IHelloUsecase from '../../usecases/hello-usecase/types';
import { IAuthenticateUserUsecase } from '../../usecases/authenticate-user/types';
import { ISignUserTokenUsecase } from '../../usecases/sign-user-token/types';

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
});
