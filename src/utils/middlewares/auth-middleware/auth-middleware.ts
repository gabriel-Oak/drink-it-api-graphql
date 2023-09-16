import { MiddlewareInterface, ResolverData } from 'type-graphql';
import IContext from '../context/types';
import ClassMiddleware from '../../decorators/middleware';

@ClassMiddleware()
export default class AuthMiddleware implements MiddlewareInterface<IContext> {
  async use({ context }: ResolverData<IContext>) {
    if (context.authError) throw context.authError;
    return true;
  }
}
