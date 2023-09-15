import HelloUsecase from './hello-usecase';
import IHelloUsecase from './types';

describe('HelloUsecase Tests', () => {
  const usecase: IHelloUsecase = new HelloUsecase();

  it('Should return hello world', () => {
    const result = usecase.execute();
    expect(result).toBe('Hello World Improved!!!!');
  });
});
