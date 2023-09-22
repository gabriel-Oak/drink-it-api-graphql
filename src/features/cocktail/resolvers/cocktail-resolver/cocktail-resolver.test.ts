/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, mockReset } from 'jest-mock-extended';
import { IGetCocktailsUsecase } from '../../usecases/get-cocktails/types';
import CocktailResolver from './cocktail-resolver';
import ICocktailResolver, { CocktailQuery } from './types';
import { Left, Right } from '../../../../utils/types';
import Cocktail from '../../entities/cocktail';
import { cocktailDetailMock } from '../../mocks/cocktail';
import HttpError from '../../../../utils/errors/http-error';
import { CocktailDatasourceError } from '../../datasources/external-datasource/types';
import '../../entities/measure';
import { GetDetailsValidationError, IGetDetailsUsecase } from '../../usecases/get-details/type';
import { IGetRandomUsecase, RandomNotFoundError } from '../../usecases/get-random/types';

describe('CocktailResolver Tests', () => {
  const getCocktailsMock = mock<IGetCocktailsUsecase>();
  const getDetailsMock = mock<IGetDetailsUsecase>();
  const getRandomMock = mock<IGetRandomUsecase>();
  const resolver: ICocktailResolver = new CocktailResolver(
    getCocktailsMock,
    getDetailsMock,
    getRandomMock,
  );
  const successMock = [Cocktail.fromSource(cocktailDetailMock as any)];

  beforeEach(() => {
    mockReset(getCocktailsMock);
    mockReset(getDetailsMock);
    mockReset(getRandomMock);
  });

  it('Should return cocktails', async () => {
    getCocktailsMock.execute
      .mockImplementation(async () => new Right(successMock));
    const result = await resolver.getCocktails(mock<CocktailQuery>());

    expect(result).toEqual(successMock);
  });

  it('Should return not found location', async () => {
    getCocktailsMock.execute
      .mockImplementation(async () => new Left(new CocktailDatasourceError('Opps')));
    const result = await resolver.getCocktails(mock<CocktailQuery>());

    expect(result).toEqual(new HttpError({
      statusCode: 500,
      message: 'Opps',
    }));
  });

  it('Should return error when no parameters', async () => {
    const result = await resolver.getCocktails({});

    expect(result).toEqual(new HttpError({
      statusCode: 400,
      message: 'Sorry, you need to specify a searching parameter',
    }));
  });

  it('Should return cocktails', async () => {
    getCocktailsMock.execute
      .mockImplementation(async () => new Right(successMock));
    const result = await resolver.getCocktails(mock<CocktailQuery>());

    expect(result).toEqual(successMock);
  });

  it('Should return cocktail details', async () => {
    getDetailsMock.execute
      .mockImplementation(async () => new Right(Cocktail.fromSource(cocktailDetailMock as any)));
    const result = await resolver.getCocktailDetail('test3298472');

    expect(result).toEqual(Cocktail.fromSource(cocktailDetailMock as any));
  });

  it('Should return get details validation error', async () => {
    getDetailsMock.execute
      .mockImplementation(async () => new Left(new GetDetailsValidationError()));
    const result = await resolver.getCocktailDetail('test3298472');

    expect(result).toEqual(new HttpError({
      statusCode: 400,
      message: 'Sorry, you need to specify a cocktail id to search',
    }));
  });

  it('Should return cocktail random', async () => {
    getRandomMock.execute
      .mockImplementation(async () => new Right(Cocktail.fromSource(cocktailDetailMock as any)));
    const result = await resolver.getRandomCocktail();

    expect(result).toEqual(Cocktail.fromSource(cocktailDetailMock as any));
  });

  it('Should return random cocktail error', async () => {
    getRandomMock.execute
      .mockImplementation(async () => new Left(new RandomNotFoundError()));
    const result = await resolver.getRandomCocktail();

    expect(result).toEqual(new HttpError({
      statusCode: 500,
      message: 'Sorry, couldn\'t find you a random cocktail now',
    }));
  });
});
