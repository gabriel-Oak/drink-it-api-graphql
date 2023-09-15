import { mock, mockReset } from 'jest-mock-extended';
import IUserResolver from './types';
import UserResolver from './user-resolver';
import IHelloUsecase from '../../usecases/hello-usecase/types';

describe('UserResolver Tests', () => {
  const usecaseMock = mock<IHelloUsecase>();
  const resolver: IUserResolver = new UserResolver(usecaseMock);

  beforeEach(() => {
    mockReset(usecaseMock);
  });

  it('Should return hello world', async () => {
    usecaseMock.execute.mockImplementationOnce(() => 'OMG DID IT REALLY WORK!?');
    const result = await resolver.hello();

    expect(result).toBe('OMG DID IT REALLY WORK!?');
  });
});
