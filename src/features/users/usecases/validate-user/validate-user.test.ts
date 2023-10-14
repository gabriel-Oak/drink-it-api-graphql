import { Left, Right } from '../../../../utils/types';
import { UserProps } from '../../entities/user';
import { IValidateUserUsecase } from './types';
import ValidateUserUsecase from './validate-user';

describe('ValidadeUserUsecase tests', () => {
  const usecase: IValidateUserUsecase = new ValidateUserUsecase();
  const payloadMock: UserProps = {
    email: 'hellomyboy@gmail.com',
    name: 'Jhon Doe',
    password: '123ohmygod',
  };

  it('Should pass validations', () => {
    const result = usecase.execute(payloadMock);
    expect(result).toBeInstanceOf(Right);
  });

  it('Should fail email', () => {
    const result = usecase.execute({ ...payloadMock, email: 'test' });
    expect(result).toBeInstanceOf(Left);
  });

  it('Should fail password', () => {
    const result = usecase.execute({ ...payloadMock, password: '' });
    expect(result).toBeInstanceOf(Left);
  });

  it('Should fail name', () => {
    const result = usecase.execute({ ...payloadMock, name: '' });
    expect(result).toBeInstanceOf(Left);
  });
});
