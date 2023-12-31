/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, mockReset } from 'jest-mock-extended';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Cocktail from '../../entities/cocktail';
import InternalCocktailDatasource from './internal-datasource';
import { IInternalCocktailDatasource, InternalCocktailDatasourceError } from './types';
import Measure from '../../entities/measure';
import Ingredient from '../../entities/ingredient';
import { Left, Right } from '../../../../utils/types';
import { cocktailDetailMock } from '../../mocks/cocktail';
import { ILoggerService } from '../../../../utils/services/logger-service/types';

describe('InternalCocktailDatasource Tests', () => {
  const cocktailRepositoryMock = mock<Repository<Cocktail>>();
  const measureRepositoryMock = mock<Repository<Measure>>();
  const ingredientRepositoryMock = mock<Repository<Ingredient>>();
  const loggerMock = mock<ILoggerService>();
  const cocktailMock = Cocktail.fromSource(cocktailDetailMock as any);
  const queryBuilder = mock<SelectQueryBuilder<Cocktail>>();
  const initDBMock = jest.fn();

  const datasource: IInternalCocktailDatasource = new InternalCocktailDatasource(
    cocktailRepositoryMock,
    measureRepositoryMock,
    ingredientRepositoryMock,
    loggerMock,
    initDBMock,
  );

  beforeEach(() => {
    mockReset(cocktailRepositoryMock);
    mockReset(measureRepositoryMock);
    mockReset(ingredientRepositoryMock);
    mockReset(loggerMock);
    mockReset(queryBuilder);
    initDBMock.mockReset();

    initDBMock.mockImplementation(async () => true);
    queryBuilder.leftJoinAndSelect.mockReturnThis();
    queryBuilder.select.mockReturnThis();
    queryBuilder.orderBy.mockReturnThis();
    cocktailRepositoryMock.createQueryBuilder.mockReturnValue(queryBuilder);
  });

  it('Should error connection on save cocktail', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.saveOne(cocktailMock);

    expect(result).toBeInstanceOf(Left);
  });

  it('Should save cocktail', async () => {
    cocktailRepositoryMock.save.mockImplementation(async (c) => c as any);
    measureRepositoryMock.save.mockImplementation(async (m) => m as any);
    measureRepositoryMock.findOne.mockImplementation(async () => cocktailMock.measures[0] as any);
    ingredientRepositoryMock.save.mockImplementation(async (i) => i as any);
    ingredientRepositoryMock.findOne
      .mockImplementationOnce(async () => cocktailMock.measures[0].ingredient);
    const result = await datasource.saveOne(cocktailMock);

    expect(result).toBeInstanceOf(Right);
  });

  it('Shouldn\'t save cocktail if exist', async () => {
    cocktailRepositoryMock.findOne.mockImplementationOnce(async () => cocktailMock);
    const result = await datasource.saveOne(cocktailMock);
    expect(result).toBeInstanceOf(Right);
    expect(cocktailRepositoryMock.save).not.toHaveBeenCalled();

    ingredientRepositoryMock.findOne
      .mockImplementationOnce(async () => cocktailMock.measures[0].ingredient);
    measureRepositoryMock.findOne.mockImplementationOnce(async () => cocktailMock.measures[0]);
    const result2 = await datasource.saveOne(cocktailMock);

    expect(result2).toBeInstanceOf(Right);
    expect(measureRepositoryMock.save).not.toHaveBeenCalled();
    expect(ingredientRepositoryMock.save).not.toHaveBeenCalled();
  });

  it('Should deal with database error', async () => {
    cocktailRepositoryMock.findOne.mockRejectedValue(Error('HOLY MOLLY WE GOT AN OLLIE'));
    const result = await datasource.saveOne(cocktailMock);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalCocktailDatasourceError);
  });

  it('Should error connection on find one cocktail', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.findOne('7382');

    expect(result).toBeInstanceOf(Left);
  });

  it('Should find one cocktail', async () => {
    cocktailRepositoryMock.findOne.mockImplementation(async () => cocktailMock);
    const result = await datasource.findOne('7382');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(Cocktail);
  });

  it('Should deal with finding errors', async () => {
    cocktailRepositoryMock.findOne.mockRejectedValue(Error('Crap you to beaultiful for this'));
    const result = await datasource.findOne('7382');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalCocktailDatasourceError);
  });

  it('Should error connection on find may cocktails', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.findMany(['7382']);

    expect(result).toBeInstanceOf(Left);
  });

  it('Should find many cocktails', async () => {
    cocktailRepositoryMock.find.mockImplementation(async () => [cocktailMock]);
    const result = await datasource.findMany(['7382']);

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(Array<Cocktail>);
  });

  it('Should deal with finding many errors', async () => {
    cocktailRepositoryMock.find.mockRejectedValue(Error('Crap you to beaultiful for this'));
    const result = await datasource.findMany(['7382']);

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalCocktailDatasourceError);
  });

  it('Should error connection on find random cocktail', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.findRandom();

    expect(result).toBeInstanceOf(Left);
  });

  it('Should find random cocktail', async () => {
    queryBuilder.getOne.mockImplementation(async () => cocktailMock);
    const result = await datasource.findRandom();

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(Cocktail);
  });

  it('Should deal with finding random errors', async () => {
    queryBuilder.getOne.mockRejectedValue(Error('Crap you to beaultiful for this'));
    const result = await datasource.findRandom();

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalCocktailDatasourceError);
  });

  it('Should error connection on find by name cocktails', async () => {
    initDBMock.mockImplementation(async () => false);
    const result = await datasource.findByName('margerita');

    expect(result).toBeInstanceOf(Left);
  });

  it('Should find by name cocktails', async () => {
    cocktailRepositoryMock.find.mockImplementation(async () => [cocktailMock]);
    const result = await datasource.findByName('margerita');

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(Array<Cocktail>);
  });

  it('Should deal with finding by name errors', async () => {
    cocktailRepositoryMock.find.mockRejectedValue(Error('Crap you to beaultiful for this'));
    const result = await datasource.findByName('margerita');

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(InternalCocktailDatasourceError);
  });
});
