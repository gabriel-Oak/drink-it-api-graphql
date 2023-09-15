import { injectable } from 'inversify';
import { Resolver as ResolverGQL } from 'type-graphql';
import createContainer from './container';

const Resolver: typeof ResolverGQL = <T extends abstract new (...args: never) => unknown>() => (
  target: T,
) => {
  const inject = injectable();
  inject(target);
  const container = createContainer();

  container.bind<T>(target).toSelf();

  const resolver = ResolverGQL();
  resolver(target);
  return target;
};

export default Resolver;
