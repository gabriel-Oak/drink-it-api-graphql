import { Query, Resolver } from 'type-graphql';
import IUserResolver from './types';
import { Service } from 'typedi';

@Service()
@Resolver()
export default class UserResolver implements IUserResolver {
  constructor() {}

  @Query(() => String)
  async hello() {
    return 'Hello World';
  }
}