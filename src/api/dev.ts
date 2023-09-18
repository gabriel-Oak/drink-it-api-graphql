import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';
import { ContextFunction } from '@apollo/server';
import { main } from '..';
import { ILoggerService } from '../utils/services/logger-service/types';
import createContainer from '../utils/decorators/container';
import context from '../utils/middlewares/context';
import IContext from '../utils/middlewares/context/types';

(async () => {
  const container = createContainer();

  const logger = container.get<ILoggerService>('ILoggerService');
  const server = await main();

  const { url } = await startStandaloneServer(server, {
    context: context as unknown as ContextFunction<
      [StandaloneServerContextFunctionArgument], IContext
    >,
  });
  logger.info(`Hooray!!! Server UP and running at ${url}`);
})();
