import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Container } from 'typedi';
import createLoggerService from './utils/services/logger-service';
import resolvers from './resolvers';


async function main() {
  const logger = createLoggerService();

  logger.info('Building schema');
  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: path.resolve(__dirname, 'utils', 'schema.gql'),
    container: Container,
  });

  logger.info('Creating server');
  const server = new ApolloServer({
    schema
  });

  const { url } = await startStandaloneServer(server);
  logger.info(`Horay! Server UP and running at: ${url}`);
}

main();