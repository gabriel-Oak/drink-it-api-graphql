import { inject } from 'inversify';
import Injectable from '../../../../utils/decorators/injectable';
import { IGetByNameUsecase } from './types';
import { IInternalCocktailDatasource } from '../../datasources/internal-datasource/types';
import { Right } from '../../../../utils/types';
import Cocktail from '../../entities/cocktail';
import { ICocktailExternalDatasource } from '../../datasources/external-datasource/types';

@Injectable('IGetByNameUsecase')
export default class GetByNameUsecase implements IGetByNameUsecase {
  constructor(
    @inject('IInternalCocktailDatasource')
    private readonly internalDatasource: IInternalCocktailDatasource,
    @inject('ICocktailExternalDatasource')
    private readonly externalDatasource: ICocktailExternalDatasource,
  ) { }

  async execute(name: string) {
    const externalCocktails = await this.externalDatasource.getCocktailsByName(name);
    if (externalCocktails.isSuccess && externalCocktails.success) {
      externalCocktails.success.forEach((c) => {
        this.internalDatasource.saveOne(c).catch();
      });
      return externalCocktails as Right<Cocktail[]>;
    }

    const internallCocktails = await this.internalDatasource.findByName(name);
    return internallCocktails;
  }
}
