import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { ICocktailExternalDatasource } from '../../datasources/external-datasource/types';
import { IInternalCocktailDatasource } from '../../datasources/internal-datasource/types';
import { IGetRandomUsecase, RandomNotFoundError } from './types';
import { Left, Right } from '../../../../utils/types';
import Cocktail from '../../entities/cocktail';

@Injectable('IGetRandomUsecase')
export default class GetRandomUsecase implements IGetRandomUsecase {
  constructor(
    @inject('ICocktailExternalDatasource')
    private readonly externalDatasource: ICocktailExternalDatasource,
    @inject('IInternalCocktailDatasource')
    private readonly internalDatasource: IInternalCocktailDatasource,
  ) { }

  async execute() {
    const externalResult = await this.externalDatasource
      .getRamdomCocktail() as unknown as Right<Cocktail>;
    if (externalResult.isSuccess && externalResult.success) return externalResult;

    const internalResult = await this.internalDatasource
      .findRandom() as unknown as Right<Cocktail>;
    if (internalResult.isSuccess && internalResult.success) return internalResult;

    return new Left(new RandomNotFoundError());
  }
}
