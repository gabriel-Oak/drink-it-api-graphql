import { injectable } from 'inversify';
import createContainer from './container';

export default function Injectable<T extends abstract new (...args: never) => unknown>(type: string) {
  return (
    target: T
  ) => { 
    const inject = injectable();
    inject(target as any);
    const container = createContainer();

    container.bind<T>(type).to(target as any).inSingletonScope();
    return target;
  };
}