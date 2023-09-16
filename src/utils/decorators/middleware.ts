import { injectable } from 'inversify';
import createContainer from './container';

const ClassMiddleware = <T extends abstract new (...args: never) => unknown>() => (
  target: T,
) => {
  const inject = injectable();
  inject(target);
  const container = createContainer();
  container.bind<T>(target).toSelf();

  return target;
};

export default ClassMiddleware;
