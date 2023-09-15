import Injectable from '../../../../utils/decorators/injectable';
import IHelloUsecase from './types';

@Injectable('IHelloUsecase')
export default class HelloUsecase implements IHelloUsecase {
  execute() {
    return 'Hello World Improved!!!!'
  }
}