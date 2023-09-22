import BaseError from '../../../../utils/errors/base-error';
import { Either } from '../../../../utils/types';
import { CocktailDatasourceError } from '../../datasources/external-datasource/types';
import { InternalCocktailDatasourceError } from '../../datasources/internal-datasource/types';
import Cocktail from '../../entities/cocktail';

export class RandomNotFoundError extends BaseError {
  public readonly type = 'random-not-found';

  constructor() {
    super('Sorry, couldn\'t find you a random cocktail now');
  }
}

export type getDetailsErrors = InternalCocktailDatasourceError
  | CocktailDatasourceError
  | RandomNotFoundError;

export interface IGetRandomUsecase {
  execute: () => Promise<Either<getDetailsErrors, Cocktail>>;
}
