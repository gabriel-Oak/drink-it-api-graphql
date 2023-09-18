import { startStandaloneServer } from '@apollo/server/standalone';
import { main } from '.';
import createContainer from './utils/decorators/container';
import { ILoggerService } from './utils/services/logger-service/types';
import context from './utils/middlewares/context';

(async () => {
  const container = createContainer();
  const logger = container.get<ILoggerService>('ILoggerService');
  const server = await main(true);

  const { url } = await startStandaloneServer(server, { context });
  logger.info(`Hooray!!! Server UP and running at ${url}`);
})();
