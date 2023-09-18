/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import './config';
import path from 'path';
import { ApolloServer, ContextFunction } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startServerAndCreateLambdaHandler, handlers, LambdaContextFunctionArgument } from '@as-integrations/aws-lambda';
import {
  APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2, Callback, Context,
} from 'aws-lambda';
import createContainer from './utils/decorators/container';
import resolvers from './resolvers';
import { ILoggerService } from './utils/services/logger-service/types';
import './utils/services';
import context from './utils/middlewares/context';
import IContext from './utils/middlewares/context/types';
import AuthMiddleware from './utils/middlewares/auth-middleware';
import { initDB } from './utils/services/datatabase-service';

export async function main() {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  await initDB();

  logger.info('Building schema');
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'utils', 'schema.gql'),
    container,
    validate: false,
    authChecker: AuthMiddleware,
  });

  logger.info('Creating server');
  const server = new ApolloServer({
    schema,
    logger,
  });

  return server
}

// This final export is important!
export const graphqlHandler = async (
  p1: APIGatewayProxyEventV2,
  p2: Context,
  p3: Callback<APIGatewayProxyStructuredResultV2>,
) => {
  const server = await main();

  return startServerAndCreateLambdaHandler(
    server,
    // We will be using the Proxy V2 handler
    handlers.createAPIGatewayProxyEventV2RequestHandler(),
    {
      context: context as unknown as ContextFunction<[
        LambdaContextFunctionArgument<
          handlers.RequestHandler<APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2>
        >
      ], IContext>,
    },
  )(p1, p2, p3);
};
