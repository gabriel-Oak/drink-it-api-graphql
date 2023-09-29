import { inject } from 'inversify';
import { Arg, Query } from 'type-graphql';
import Resolver from '../../../../utils/decorators/resolver';
import Cocktail from '../../entities/cocktail';
import ICocktailResolver, { CocktailQuery } from './types';
import { IGetCocktailsUsecase } from '../../usecases/get-cocktails/types';
import HttpError from '../../../../utils/errors/http-error';
import { getCocktailsQuery } from '../../entities/get-cocktails';
import { IGetDetailsUsecase } from '../../usecases/get-details/type';
import { IGetRandomUsecase } from '../../usecases/get-random/types';
import { IGetByNameUsecase } from '../../usecases/get-by-name/types';

@Resolver()
export default class CocktailResolver implements ICocktailResolver {
  constructor(
    @inject('IGetCocktailsUsecase')
    private readonly getCocktailsUsecase: IGetCocktailsUsecase,
    @inject('IGetDetailsUsecase')
    private readonly getDetailUsecase: IGetDetailsUsecase,
    @inject('IGetRandomUsecase')
    private readonly getRandomUsecase: IGetRandomUsecase,
    @inject('IGetByNameUsecase')
    private readonly getByNameUsecase: IGetByNameUsecase,
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
    if (result.isSuccess) return result.success;

    return new HttpError(result.error);
  }

  @Query(() => Cocktail)
  async getCocktailDetail(@Arg('cocktailId') cocktailId: string) {
    const result = await this.getDetailUsecase.execute(cocktailId);
    if (result.isSuccess) return result.success;

    return new HttpError({
      ...result.error,
      statusCode: result.error.type === 'get-detail-validation' ? 400 : 500,
    });
  }

  @Query(() => Cocktail)
  async getRandomCocktail() {
    const result = await this.getRandomUsecase.execute();
    if (result.isSuccess) return result.success;

    return new HttpError(result.error);
  }

  @Query(() => [Cocktail])
  async getCocktailsByName(@Arg('name') cocktailName: string) {
    const result = await this.getByNameUsecase.execute(cocktailName);
    if (result.isSuccess) return result.success;

    return new HttpError(result.error);
  }
}
