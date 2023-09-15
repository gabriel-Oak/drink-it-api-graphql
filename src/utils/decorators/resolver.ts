import { injectable } from 'inversify';
import createContainer from './container';
import { Resolver as ResolverGQL } from 'type-graphql';

const Resolver: typeof ResolverGQL = <T extends abstract new (...args: never) => unknown>() => {
  return (
    target: T
  ) => {
    const inject = injectable();
    inject(target as any);
    const container = createContainer();

    container.bind<T>(target as any).toSelf();

    const resolver = ResolverGQL();
    resolver(target)
    return target;
  };
}

export default Resolver