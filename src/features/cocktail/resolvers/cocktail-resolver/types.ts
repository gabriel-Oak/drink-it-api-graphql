import { Field, InputType } from 'type-graphql';
import Cocktail from '../../entities/cocktail';
import HttpError from '../../../../utils/errors/http-error';

@InputType()
export class CocktailQuery {
  @Field({
    description: 'filter by ingredients',
    nullable: true,
  })
  public i?: string;

  @Field({
    description: 'filter by alcoholic',
    nullable: true,
  })
  public a?: string;

  @Field({
    description: 'filter by category',
    nullable: true,
  })
  public c?: string;

  @Field({
    description: 'filter by glass',
    nullable: true,
  })
  public g?: string;
}

export default interface ICocktailResolver {
  getCocktails: (query: CocktailQuery) => Promise<HttpError | Cocktail[]>;
  getCocktailDetail: (cocktailId: string) => Promise<HttpError | Cocktail>;
  getRandomCocktail: () => Promise<HttpError | Cocktail>;
}
