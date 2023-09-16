/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import './config';
import path from 'path';
import { ApolloServer, ContextFunction } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';
import createContainer from './utils/decorators/container';
import resolvers from './resolvers';
import { ILoggerService } from './utils/services/logger-service/types';
import './utils/services';
import context from './utils/middlewares/context';
import IContext from './utils/middlewares/context/types';
import AuthMiddleware from './utils/middlewares/auth-middleware';

async function main() {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');

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

  const { url } = await startStandaloneServer(server, {
    context: context as unknown as ContextFunction<
      [StandaloneServerContextFunctionArgument], IContext
    >,
  });
  logger.info(`Horay! Server UP and running at ${url}`);
}

main();
