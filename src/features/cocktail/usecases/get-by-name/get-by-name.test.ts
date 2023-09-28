import { mock, mockReset } from 'jest-mock-extended';
import { ICocktailExternalDatasource } from '../../datasources/external-datasource/types';
import { IInternalCocktailDatasource } from '../../datasources/internal-datasource/types';
import { IGetByNameUsecase } from './types';
import GetByNameUsecase from './get-by-name';
import Cocktail from '../../entities/cocktail';
import { Right } from '../../../../utils/types';

describe('GetByNameUsecase Tests', () => {
  const externalDatasourceMock = mock<ICocktailExternalDatasource>();
  const internalDatasourceMock = mock<IInternalCocktailDatasource>();
  const cocktailsMock = [mock<Cocktail>()];

  const usecase: IGetByNameUsecase = new GetByNameUsecase(
    internalDatasourceMock,
    externalDatasourceMock,
  );

  beforeEach(() => {
    mockReset(externalDatasourceMock);
    mockReset(internalDatasourceMock);

    internalDatasourceMock.saveOne.mockImplementation(async () => new Right(null));
  });

  it('Should find cocktails externally', async () => {
    externalDatasourceMock.getCocktailsByName
      .mockImplementation(async () => new Right(cocktailsMock));
    const result = await usecase.execute('margerita');

    expect(result).toBeInstanceOf(Right);
    expect(internalDatasourceMock.saveOne).toHaveBeenCalled();
  });

  it('Should find cocktails internally', async () => {
    externalDatasourceMock.getCocktailsByName
      .mockImplementation(async () => new Right(null));
    internalDatasourceMock.findByName
      .mockImplementation(async () => new Right(cocktailsMock));
    const result = await usecase.execute('margerita');

    expect(result).toBeInstanceOf(Right);
    expect(internalDatasourceMock.saveOne).not.toHaveBeenCalled();
    expect(externalDatasourceMock.getCocktailsByName).toHaveBeenCalled();
  });
});
