import { Logger, createLogger } from 'winston';
import createContainer from '../../decorators/container';
import './logger-service';

createContainer().bind<Logger>('Logger')
  .toDynamicValue(() => createLogger());
