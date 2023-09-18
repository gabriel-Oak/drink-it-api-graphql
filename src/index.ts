/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import './config';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import express, { NextFunction, Request, Response } from 'express';
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

export async function main(emitSchemaFile = false) {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  await initDB();

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

const port = process.env.port || 3000;
const app = express();

app.get('/ping', async (_req: Request, res: Response) => {
  res.json('pong 🏓');
});

app.listen(port);
app.use(cors());
app.use(json());
app.use('/graphql', async (req: Request, res: Response, next: NextFunction) => {
  const server = await main();
  await server.start();
  return expressMiddleware(server, { context })(req, res, next);
});

export default app;
