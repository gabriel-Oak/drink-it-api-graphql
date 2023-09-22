import { inject } from 'inversify';
import { COCKTAIL_API } from '../../../../utils/constants';
import Injectable from '../../../../utils/decorators/injectable';
import { IHttpService } from '../../../../utils/services/http-service/types';
import { ILoggerService } from '../../../../utils/services/logger-service/types';
import { Left, Right } from '../../../../utils/types';
import Cocktail from '../../entities/cocktail';
import {
  GetCocktailDetailsResponse,
  GetCocktailsListResponse,
  GetRandomCocktailResponse,
  getCocktailsQuery,
} from '../../entities/get-cocktails';
import { CocktailDatasourceError, ICocktailExternalDatasource } from './types';

@Injectable('ICocktailExternalDatasource')
export default class CocktailExternalDatasource implements ICocktailExternalDatasource {
  constructor(
    @inject('IHttpService') private readonly httpService: IHttpService,
    @inject('ILoggerService') private readonly logger: ILoggerService,
  ) { }

  async getCocktailsList(query: getCocktailsQuery) {
    try {
      const result = await this.httpService.get<GetCocktailsListResponse>(`${COCKTAIL_API}/filter.php`, {
        params: query,
      });

      return new Right(result.drinks);
    } catch (e) {
      const error = new CocktailDatasourceError(
        'Something went wrong consulting cocktails service',
        { error: e, query },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async getCocktailDetail(cocktailId: string) {
    try {
      const result = await this.httpService.get<GetCocktailDetailsResponse>(`${COCKTAIL_API}/lookup.php`, {
        params: { i: cocktailId },
      });

      return new Right(result.drinks?.[0]
        ? Cocktail.fromSource(result.drinks?.[0])
        : null);
    } catch (e) {
      const error = new CocktailDatasourceError(
        'Something wen wrong consulting cocktails service',
        { error: e, cocktailId },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async getRamdomCocktail() {
    try {
      const result = await this.httpService.get<GetRandomCocktailResponse>(`${COCKTAIL_API}/random.php`);

      return new Right(Cocktail.fromSource(result.drinks?.[0]));
    } catch (e) {
      const error = new CocktailDatasourceError(
        'Something wen wrong consulting cocktails service',
        { error: e },
      );
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }
}
