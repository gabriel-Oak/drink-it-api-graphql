/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import './config';
import './utils/services';
import { startStandaloneServer } from '@apollo/server/standalone';
import context from './utils/middlewares/context';
import createContainer from './utils/decorators/container';
import { ILoggerService } from './utils/services/logger-service/types';
import createServer from './server';

async function main() {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  const server = await createServer(true);

  const { url } = await startStandaloneServer(server, { context });
  logger.info(`Hooray!!! Server UP and running at ${url}`);
}

main();
