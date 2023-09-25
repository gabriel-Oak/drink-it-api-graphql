import path from 'path';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import AuthMiddleware from './utils/middlewares/auth-middleware';
// import { initDB } from './utils/services/datatabase-service';
import createContainer from './utils/decorators/container';
import resolvers from './resolvers';
import { ILoggerService } from './utils/services/logger-service/types';

export default async function createServer(emitSchemaFile = false) {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  // await initDB();

  logger.info(`Building schema emitSchemaFile: ${emitSchemaFile}`);
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: emitSchemaFile ? path.resolve(__dirname, 'utils', 'schema.gql') : undefined,
    container,
    validate: false,
    authChecker: AuthMiddleware,
  });

  logger.info('Creating server');
  const server = new ApolloServer({
    schema,
    logger,
  });

  return server;
}
