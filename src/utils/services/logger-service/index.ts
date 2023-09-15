import { createLogger } from 'winston';
import { ILoggerService } from './types';
import LoggerService from './logger-service';

let instance: ILoggerService;
const createLoggerService = (): ILoggerService => {
  if (!instance) instance = new LoggerService(createLogger());
  return instance;
};

export default createLoggerService;
