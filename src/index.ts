import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import createContainer from './utils/decorators/container';
import resolvers from './resolvers';
import { ILoggerService } from './utils/services/logger-service/types';
import './utils/services';

async function main() {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');

  logger.info('Building schema');
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'utils', 'schema.gql'),
    container,
  });

  logger.info('Creating server');
  const server = new ApolloServer({
    schema,
    logger,
  });

  const { url } = await startStandaloneServer(server);
  logger.info(`Horay! Server UP and running at ${url}`);
}

main();
