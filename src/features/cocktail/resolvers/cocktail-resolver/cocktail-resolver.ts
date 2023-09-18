import { inject } from 'inversify';
import { Arg, Query } from 'type-graphql';
import Resolver from '../../../../utils/decorators/resolver';
import Cocktail from '../../entities/cocktail';
import ICocktailResolver, { CocktailQuery } from './types';
import { IGetCocktailsUsecase } from '../../usecases/get-cocktails/types';
import HttpError from '../../../../utils/errors/http-error';
import { getCocktailsQuery } from '../../entities/get-cocktails';

@Resolver()
export default class CocktailResolver implements ICocktailResolver {
  constructor(
    @inject('IGetCocktailsUsecase')
    private readonly getCocktailsUsecase: IGetCocktailsUsecase,
  ) { }

  @Query(() => [Cocktail])
  async getCocktails(@Arg('query') query: CocktailQuery) {
    if (!query || !Object.values(query as object).some(Boolean)) {
      return new HttpError({
        message: 'Sorry, you need to specify a searching parameter',
        statusCode: 400,
      });
    }

    const result = await this.getCocktailsUsecase.execute(query as getCocktailsQuery);
    if (!result.isError) return result.success;

    return new HttpError(result.error);
  }
}
