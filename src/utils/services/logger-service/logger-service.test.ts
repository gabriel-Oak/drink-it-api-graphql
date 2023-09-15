import { mock, mockReset } from 'jest-mock-extended';
import { Logger } from 'winston';
import LoggerService from './logger-service';
import { ILoggerService } from './types';

describe('LoggerService Tests', () => {
  const loggerMock = mock<Logger>();
  const service: ILoggerService = new LoggerService(loggerMock);

  beforeEach(() => {
    mockReset(loggerMock);
  });

  it('Should info', () => {
    service.info('This is a info');
    expect(loggerMock.info).toBeCalledWith('This is a info', undefined);
  });

  it('Should warn', () => {
    service.warn('This is a warn');
    expect(loggerMock.warn).toBeCalledWith('This is a warn', undefined);
  });

  it('Should error', () => {
    service.error('This is a error');
    expect(loggerMock.error).toBeCalledWith('This is a error', undefined);
  });

  it('Should debug', () => {
    service.debug('This is a debug');
    expect(loggerMock.debug).toBeCalledWith('This is a debug', undefined);
  });
});
