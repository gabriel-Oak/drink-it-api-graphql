import { In, Repository } from 'typeorm';
import { inject } from 'inversify';
import { Either, Left, Right } from '../../../../utils/types';
import Cocktail from '../../entities/cocktail';
import Measure from '../../entities/measure';
import Ingredient from '../../entities/ingredient';
import { IInternalCocktailDatasource, InternalCocktailDatasourceError } from './types';
import { ILoggerService } from '../../../../utils/services/logger-service/types';
import Injectable from '../../../../utils/decorators/injectable';
import { IError } from '../../../../utils/services/cache-service/types';

@Injectable('IInternalCocktailDatasource')
export default class InternalCocktailDatasource implements IInternalCocktailDatasource {
  constructor(
    @inject('Repository<Cocktail>') private readonly cocktailRepository: Repository<Cocktail>,
    @inject('Repository<Measure>') private readonly measureRepository: Repository<Measure>,
    @inject('Repository<Ingredient>') private readonly ingredientRepository: Repository<Ingredient>,
    @inject('ILoggerService') private readonly logger: ILoggerService,
    @inject('initDB') private readonly initDB: () => Promise<boolean>,
  ) { }

  private async connect(
    tries = 0,
  ): Promise<Either<InternalCocktailDatasourceError, null>> {
    if (tries === 10) {
      return new Left(
        new InternalCocktailDatasourceError('Couldn\'t connect the database after 10 tries'),
      );
    }

    const initialized = await new Promise<boolean>((r) => {
      setTimeout(() => {
        this.initDB().then(r);
      }, 1000);
    });
    return initialized ? new Right(null) : this.connect(tries + 1);
  }

  async saveOne(cocktail: Cocktail) {
    const connectionResult = await this.connect();
    if (connectionResult.isError) return connectionResult;

    try {
      const cocktailExists = await this.cocktailRepository.findOne({ where: { id: cocktail.id } });

      if (!cocktailExists) await this.cocktailRepository.save(cocktail);

      for (const measure of cocktail.measures) {
        const ingredientExists = await this.ingredientRepository.findOne({
          where: { name: measure.ingredient.name },
        });

        const newMeasure = new Measure({
          ...measure,
          ingredient: ingredientExists ?? await this.ingredientRepository.save(measure.ingredient),
          cocktail,
        });

        const measureExists = await this.measureRepository.findOne({
          where: { cocktail, ingredient: newMeasure.ingredient },
        });

        if (!measureExists) await this.measureRepository.save(newMeasure);
      }

      return new Right(null);
    } catch (e) {
      const error = new InternalCocktailDatasourceError((e as IError).message ?? 'Someting went wrong saving cocktail', {
        error: e,
        cocktailId: cocktail.id,
      });
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findOne(cocktailId: string) {
    const connectionResult = await this.connect();
    if (connectionResult.isError) return connectionResult;

    try {
      const cocktail = await this.cocktailRepository.findOne({
        where: { id: cocktailId },
        relations: ['measures', 'measures.ingredient'],
      });
      return new Right(cocktail);
    } catch (e) {
      const error = new InternalCocktailDatasourceError((e as IError).message ?? 'Someting went search cocktail', {
        error: e,
        cocktailId,
      });
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findMany(cocktailsIds: string[]) {
    const connectionResult = await this.connect();
    if (connectionResult.isError) return connectionResult;

    try {
      const cocktails = await this.cocktailRepository.find({
        where: {
          id: In(cocktailsIds),
        },
        relations: ['measures', 'measures.ingredient'],
      });
      return new Right(cocktails);
    } catch (e) {
      const error = new InternalCocktailDatasourceError((e as IError).message ?? 'Someting went search cocktail', {
        error: e,
        cocktailsIds,
      });
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }

  async findRandom() {
    const connectionResult = await this.connect();
    if (connectionResult.isError) return connectionResult;

    try {
      const cocktail = await this.cocktailRepository
        .createQueryBuilder('cocktail')
        .leftJoinAndSelect('cocktail.measures', 'measure')
        .leftJoinAndSelect('measure.ingredient', 'ingredient')
        .select()
        .orderBy('RANDOM()')
        .getOne();
      return new Right(cocktail);
    } catch (e) {
      const error = new InternalCocktailDatasourceError((e as IError).message ?? 'Someting went search cocktail', {
        error: e,
      });
      this.logger.error(error.message, error);
      return new Left(error);
    }
  }
}
