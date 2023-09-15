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
const logger = createContainer().get<ILoggerService>('ILoggerService');

const initDB = () => {
  logger.info('Initializing connection with database');
  DatabaseService.initialize()
    .then(() => logger.info('Database initialized successfuly'))
    .catch((error) => {
      logger.error('Database initialize error', error);
      logger.warn('Trying to reconnect in 1m');
      setTimeout(() => {
        initDB();
      }, 5000);
    });
};

initDB();

createContainer().bind<Repository<CocktailIngredient>>('Repository<CocktailIngredient>')
  .toDynamicValue(() => DatabaseService.getRepository(CocktailIngredient));
createContainer().bind<Repository<Ingredient>>('Repository<Ingredient>')
  .toDynamicValue(() => DatabaseService.getRepository(Ingredient));
createContainer().bind<Repository<Cocktail>>('Repository<Cocktail>')
  .toDynamicValue(() => DatabaseService.getRepository(Cocktail));
createContainer().bind<Repository<User>>('Repository<User>')
  .toDynamicValue(() => DatabaseService.getRepository(User));

export default DatabaseService;
