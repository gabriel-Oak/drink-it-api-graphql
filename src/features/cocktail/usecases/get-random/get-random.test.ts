/* eslint-disable @typescript-eslint/no-explicit-any */
import { mock, mockReset } from 'jest-mock-extended';
import { Left, Right } from '../../../../utils/types';
import { CocktailDatasourceError, ICocktailExternalDatasource } from '../../datasources/external-datasource/types';
import { IInternalCocktailDatasource } from '../../datasources/internal-datasource/types';
import { cocktailDetailMock } from '../../mocks/cocktail';
import Cocktail from '../../entities/cocktail';
import GetRandomUsecase from './get-random';
import { IGetRandomUsecase, RandomNotFoundError } from './types';

describe('GetRandomUsecase Tests', () => {
  const internalDatasourceMock = mock<IInternalCocktailDatasource>();
  const externalDatasourceMock = mock<ICocktailExternalDatasource>();
  const cocktailMock = Cocktail.fromSource(cocktailDetailMock as any);
  const usecase: IGetRandomUsecase = new GetRandomUsecase(
    externalDatasourceMock,
    internalDatasourceMock,
  );

  beforeEach(() => {
    mockReset(internalDatasourceMock);
    mockReset(externalDatasourceMock);
  });

  it('Should get cocktail external', async () => {
    externalDatasourceMock.getRamdomCocktail
      .mockImplementation(async () => new Right(cocktailMock));
    const result = await usecase.execute();

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(Cocktail);
  });

  it('Should get cocktail internally', async () => {
    externalDatasourceMock.getRamdomCocktail
      .mockImplementationOnce(async () => new Left(new CocktailDatasourceError('')));
    internalDatasourceMock.findRandom
      .mockImplementation(async () => new Right(cocktailMock));
    const result = await usecase.execute();

    expect(result).toBeInstanceOf(Right);
    expect((result as Right<unknown>).success).toBeInstanceOf(Cocktail);
  });

  it('Should return DetailsNotFoundError', async () => {
    internalDatasourceMock.findRandom.mockImplementation(async () => new Right(null));
    externalDatasourceMock.getRamdomCocktail.mockImplementation(async () => new Right(null as any));
    const result = await usecase.execute();

    expect(result).toBeInstanceOf(Left);
    expect((result as Left<unknown>).error).toBeInstanceOf(RandomNotFoundError);
  });
});
