import { DataSource } from 'typeorm'
import {
  POSTGRE_HOST, POSTGRE_PASS, POSTGRE_PORT, POSTGRE_USER,
} from '../../constants';
import createLoggerService from '../logger-service';
import Cocktail from '../../../features/cocktail/entities/cocktail';
import CocktailIngredient from '../../../features/cocktail/entities/measure';
import Ingredient from '../../../features/cocktail/entities/ingredient';
import User from '../../../features/users/entities/user';

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

const logger = createLoggerService();

DatabaseService.initialize()
  .then(() => logger.info('Database initialized successfuly'))
  .catch((error) => logger.error('Database initialize error', error))

export default DatabaseService;
