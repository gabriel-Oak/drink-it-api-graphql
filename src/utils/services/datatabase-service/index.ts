import { DataSource, Repository } from 'typeorm';
import {
  POSTGRE_HOST, POSTGRE_PASS, POSTGRE_PORT, POSTGRE_USER,
} from '../../constants';
import Cocktail from '../../../features/cocktail/entities/cocktail';
import CocktailIngredient from '../../../features/cocktail/entities/measure';
import Ingredient from '../../../features/cocktail/entities/ingredient';
import User from '../../../features/users/entities/user';
import createContainer from '../../decorators/container';
import { ILoggerService } from '../logger-service/types';

const DatabaseService = new DataSource({
  type: 'postgres',
  host: POSTGRE_HOST,
  port: +POSTGRE_PORT!,
  username: POSTGRE_USER,
  password: POSTGRE_PASS,
  database: POSTGRE_USER,
  entities: [
    CocktailIngredient,
    Ingredient,
    Cocktail,
    User,
  ],
  synchronize: true,
});

export const initDB = async () => {
  if (!DatabaseService.isInitialized) {
    const logger = createContainer().get<ILoggerService>('ILoggerService');
    logger.info('Initializing connection with database');
    await DatabaseService.initialize()
      .then(() => logger.info('Database initialized successfuly'))
      .catch((error) => {
        logger.error('Database initialize error: ', error);
      });
  }
  return DatabaseService.isInitialized;
};

const container = createContainer();

container.bind<Repository<CocktailIngredient>>('Repository<Measure>')
  .toDynamicValue(() => DatabaseService.getRepository(CocktailIngredient));
container.bind<Repository<Ingredient>>('Repository<Ingredient>')
  .toDynamicValue(() => DatabaseService.getRepository(Ingredient));
container.bind<Repository<Cocktail>>('Repository<Cocktail>')
  .toDynamicValue(() => DatabaseService.getRepository(Cocktail));
container.bind<Repository<User>>('Repository<User>')
  .toDynamicValue(() => DatabaseService.getRepository(User));
container.bind<DataSource>('DataSource').toDynamicValue(() => DatabaseService);
container.bind<() => Promise<boolean>>('initDB').toDynamicValue(() => initDB);

export default DatabaseService;
