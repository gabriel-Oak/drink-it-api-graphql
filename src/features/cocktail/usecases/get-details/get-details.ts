import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { Left, Right } from '../../../../utils/types';
import { ICocktailExternalDatasource } from '../../datasources/external-datasource/types';
import { IInternalCocktailDatasource } from '../../datasources/internal-datasource/types';
import Cocktail from '../../entities/cocktail';
import { DetailsNotFoundError, GetDetailsValidationError, IGetDetailsUsecase } from './type';

@Injectable('IGetDetailsUsecase')
export default class GetDetailsUsecase implements IGetDetailsUsecase {
  constructor(
    @inject('ICocktailExternalDatasource')
    private readonly externalDatasource: ICocktailExternalDatasource,
    @inject('IInternalCocktailDatasource')
    private readonly internalDatasource: IInternalCocktailDatasource,
  ) { }

  async execute(cocktailId: string) {
    if (!cocktailId) return new Left(new GetDetailsValidationError());

    const internalCocktail = await this.internalDatasource.findOne(cocktailId);
    if (!internalCocktail.isError && internalCocktail.success) {
      return internalCocktail as Right<Cocktail>;
    }

    const externalCocktail = await this.externalDatasource.getCocktailDetail(cocktailId);
    if (!externalCocktail.isError && externalCocktail.success) {
      this.internalDatasource.saveOne(externalCocktail.success);
      return externalCocktail as Right<Cocktail>;
    }

    return new Left(new DetailsNotFoundError());
  }
}
