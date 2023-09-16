import { mock } from 'jest-mock-extended';
import { ResolverData } from 'type-graphql';
import AuthMiddleware from './auth-middleware';
import IContext from '../context/types';
import HttpError from '../../errors/http-error';

describe('AuthMiddleware Tests', () => {
  const middleware = new AuthMiddleware();

  it('Should deny access', async () => {
    const result = await middleware.use(mock<ResolverData<IContext>>({
      context: mock<IContext>({
        authError: new HttpError({ statusCode: 401, message: 'ooooops' }),
      }),
    })).catch((e) => e);

    expect(result).toBeInstanceOf(HttpError);
  });

  it('Should allow access', async () => {
    const result = await middleware.use({
      context: {
        user: { id: 'siudhfui' },
      },
    } as unknown as ResolverData<IContext>);

    expect(result).toBeTruthy();
  });
});
