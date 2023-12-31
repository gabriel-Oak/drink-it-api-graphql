/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, mockReset } from 'jest-mock-extended';
import { Repository } from 'typeorm';
import User from '../../entities/user';
import InternalUserDatasource from './internal-user-datasource';
import { IInternalUserDatasource, InternalUserDatasourceError } from './types';
import { Left, Right } from '../../../../utils/types';
import { ILoggerService } from '../../../../utils/services/logger-service/types';

describe('InternalUserDatasource Tests', () => {
  const repositoryMock = mock<Repository<User>>();
  const loggerMock = mock<ILoggerService>();
  const userMock = new User();
  const initDBMock = jest.fn();

  const datasource: IInternalUserDatasource = new InternalUserDatasource(
    repositoryMock,
    loggerMock,
    initDBMock,
  );

  beforeEach(() => {
    mockReset(repositoryMock);
    mockReset(loggerMock);
    initDBMock.mockReset();

    initDBMock.mockImplementation(async () => true);
  });

  it('Should error connection on find user by email', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.findByEmail('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Left);
  });

  it('Should find user by email', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    const result = await datasource.findByEmail('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(User);
  });

  it('Should handle error finding by email', async () => {
    repositoryMock.findOneBy.mockRejectedValue(Error('HOLLY CHEAT'));
    const result = await datasource.findByEmail('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should find user by email or username', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    const result = await datasource.findByEmailOrUsername({
      email: 'hireme@gmail.com',
    });

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(User);
  });

  it('Should handle error finding by email or username', async () => {
    repositoryMock.findOneBy.mockRejectedValue(Error('HOLLY CHEAT'));
    const result = await datasource.findByEmailOrUsername({
      email: 'hireme@gmail.com',
    });

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should error connection on find user by id', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.findById('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Left);
  });

  it('Should find user by id', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    const result = await datasource.findById('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(User);
  });

  it('Should handle error finding by id', async () => {
    repositoryMock.findOneBy.mockRejectedValue(Error('HOLLY CHEAT'));
    const result = await datasource.findById('hiremexteamplsohmygod@gmaiu.com');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should error connection on save user', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.save(userMock);

    expect(result).toBeInstanceOf(Left);
  });

  it('Should save user', async () => {
    repositoryMock.save.mockImplementation(async (u) => u as User);
    const result = await datasource.save(userMock);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(User);
  });

  it('Should handle error saving user', async () => {
    repositoryMock.save.mockRejectedValue(Error('Ugly user'));
    const result = await datasource.save(userMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should error connection on update user', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.update(userMock);

    expect(result).toBeInstanceOf(Left);
  });

  it('Should update user', async () => {
    repositoryMock.update.mockImplementation(async () => null as any);
    const result = await datasource.update(userMock);

    expect(result).toBeInstanceOf(Right);
  });

  it('Should handle error updating user', async () => {
    repositoryMock.update.mockRejectedValue(Error('Ugly user'));
    const result = await datasource.update(userMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });

  it('Should error connection on remove user', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.remove('hsiuhdiusadhiudas-iasdhaishdi-haisdhiuash');

    expect(result).toBeInstanceOf(Left);
  });

  it('Should remove user', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => userMock);
    repositoryMock.remove.mockImplementation(async (u: User) => u);
    const result = await datasource.remove('hsiuhdiusadhiudas-iasdhaishdi-haisdhiuash');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(User);
  });

  it('Should handle error removing user', async () => {
    repositoryMock.findOneBy.mockImplementation(async () => null);
    const result = await datasource.remove('hsiuhdiusadhiudas-iasdhaishdi-haisdhiuash');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalUserDatasourceError);
  });
});
