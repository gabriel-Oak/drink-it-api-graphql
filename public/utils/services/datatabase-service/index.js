"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../../constants");
const cocktail_1 = __importDefault(require("../../../features/cocktail/entities/cocktail"));
const measure_1 = __importDefault(require("../../../features/cocktail/entities/measure"));
const ingredient_1 = __importDefault(require("../../../features/cocktail/entities/ingredient"));
const user_1 = __importDefault(require("../../../features/users/entities/user"));
const container_1 = __importDefault(require("../../decorators/container"));
const DatabaseService = new typeorm_1.DataSource({
    type: 'postgres',
    host: constants_1.POSTGRE_HOST,
    port: +constants_1.POSTGRE_PORT,
    username: constants_1.POSTGRE_USER,
    password: constants_1.POSTGRE_PASS,
    database: constants_1.POSTGRE_USER,
    entities: [
        measure_1.default,
        ingredient_1.default,
        cocktail_1.default,
        user_1.default,
    ],
    synchronize: true,
});
const logger = (0, container_1.default)().get('ILoggerService');
const initDB = async () => {
    logger.info('Initializing connection with database');
    await DatabaseService.initialize()
        .then(() => logger.info('Database initialized successfuly'))
        .catch((error) => {
        logger.error('Database initialize error', error);
        // logger.warn('Trying to reconnect in 5m');
        // setTimeout(() => {
        //   initDB();
        // }, 5000);
    });
};
exports.initDB = initDB;
(0, container_1.default)().bind('Repository<Measure>')
    .toDynamicValue(() => DatabaseService.getRepository(measure_1.default));
(0, container_1.default)().bind('Repository<Ingredient>')
    .toDynamicValue(() => DatabaseService.getRepository(ingredient_1.default));
(0, container_1.default)().bind('Repository<Cocktail>')
    .toDynamicValue(() => DatabaseService.getRepository(cocktail_1.default));
(0, container_1.default)().bind('Repository<User>')
    .toDynamicValue(() => DatabaseService.getRepository(user_1.default));
exports.default = DatabaseService;
