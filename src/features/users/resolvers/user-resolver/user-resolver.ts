import { Query } from 'type-graphql';
import { inject } from 'inversify';
import IUserResolver from './types';
import IHelloUsecase from '../../usecases/hello-usecase/types';
import Resolver from '../../../../utils/decorators/resolver';

@Resolver()
export default class UserResolver implements IUserResolver {
  constructor(
    @inject('IHelloUsecase') private readonly helloUsecasse: IHelloUsecase,
  ) { }

  @Query(() => String)
  async hello() {
    return this.helloUsecasse.execute();
  }
}
