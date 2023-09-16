import winston, { Logger } from 'winston';
import { inject } from 'inversify';
import { ILoggerService } from './types';
import Injectable from '../../decorators/injectable';

@Injectable('ILoggerService')
export default class LoggerService implements ILoggerService {
  constructor(
    @inject('Logger') private readonly logger: Logger,
  ) {
    if (process.env.NODE_ENV !== 'production') {
      logger.add(new winston.transports.Console({
        format: this.format,
      }));
    }
  }

  protected format = winston.format.printf(({ level, message }) => `${new Date().toLocaleString('pt-BR')} [${level.toUpperCase()}]: ${message.message
    || message.error
    || message}`);

  info(message: string, data?: unknown) {
    this.logger.info(message, data);
  }

  error(message: string, data?: unknown) {
    this.logger.error(message, data);
  }

  warn(message: string, data?: unknown) {
    this.logger.warn(message, data);
  }

  debug(message: string, data?: unknown) {
    this.logger.debug(message, data);
  }
}
