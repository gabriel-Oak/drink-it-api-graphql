import { Either } from '../../../../utils/types';
import { CocktailDatasourceError } from '../../datasources/external-datasource/types'
import Cocktail from '../../entities/cocktail';
import { getCocktailsQuery } from '../../entities/get-cocktails';

export type getCocktailsUsecaseErrors = CocktailDatasourceError;

export type cocktailMap = Record<string, Cocktail>;

export interface IGetCocktailsUsecase {
  execute: (
    query: getCocktailsQuery
  ) => Promise<Either<getCocktailsUsecaseErrors, Cocktail[]>>
}
