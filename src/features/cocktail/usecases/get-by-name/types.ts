import { Either } from '../../../../utils/types';
import { CocktailDatasourceError } from '../../datasources/external-datasource/types';
import { InternalCocktailDatasourceError } from '../../datasources/internal-datasource/types';
import Cocktail from '../../entities/cocktail';

export type getByNameErrors = InternalCocktailDatasourceError
  | CocktailDatasourceError;

export interface IGetByNameUsecase {
  execute: (name: string) => Promise<Either<getByNameErrors, Cocktail[]>>;
}
