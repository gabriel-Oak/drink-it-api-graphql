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

describe('CocktailResolver Tests', () => {
  const getCocktailsMock = mock<IGetCocktailsUsecase>();
  const resolver: ICocktailResolver = new CocktailResolver(
    getCocktailsMock,
  );
  const successMock = [Cocktail.fromSource(cocktailDetailMock as any)];

  beforeEach(() => {
    mockReset(getCocktailsMock);
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
});
