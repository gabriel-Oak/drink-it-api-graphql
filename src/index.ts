/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import './config';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import express, { Request, Response } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import createContainer from './utils/decorators/container';
import resolvers from './resolvers';
import { ILoggerService } from './utils/services/logger-service/types';
import './utils/services';
import context from './utils/middlewares/context';
import AuthMiddleware from './utils/middlewares/auth-middleware';
import { initDB } from './utils/services/datatabase-service';

const port = process.env.port || 3000;
const app = express();

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

  await server.start();
  app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, {
    context,
  }));

  logger.info(`Hooray!!! Server UP and running at port ${port}`);
}

app.get('/ping', async (_req: Request, res: Response) => {
  res.json('pong')
});
main();
app.listen(port);

export default app;
