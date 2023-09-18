import { ContextFunction } from '@apollo/server';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';
import { LambdaContextFunctionArgument, handlers } from '@as-integrations/aws-lambda';
import {
  APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import IContext from './types';
import createContainer from '../../decorators/container';
import { IDecodeUserTokenUsecase } from '../../../features/users/usecases/decode-user-token/types';
import User from '../../../features/users/entities/user';
import HttpError from '../../errors/http-error';

const context = async ({
  req, event,
}: StandaloneServerContextFunctionArgument & LambdaContextFunctionArgument<
  handlers.RequestHandler<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2>
>) => {
  let user: User | undefined;
  let authError: HttpError | undefined;
  const { headers } = req || event;
  const token = headers.authorization;

  if (token) {
    const container = createContainer();
    const decodeUser = container.get<IDecodeUserTokenUsecase>('IDecodeUserTokenUsecase');
    const decodeResult = await decodeUser.execute(token);
    if (decodeResult.isError) {
      authError = new HttpError({ statusCode: 401, ...decodeResult.error });
    } else {
      user = decodeResult.success;
      delete user.password;
    }
  }

  return {
    headers,
    user,
    authError,
  }
}

export default context as unknown as ContextFunction<
  [StandaloneServerContextFunctionArgument], IContext
>;
