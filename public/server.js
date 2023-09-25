"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const auth_middleware_1 = __importDefault(require("./utils/middlewares/auth-middleware"));
// import { initDB } from './utils/services/datatabase-service';
const container_1 = __importDefault(require("./utils/decorators/container"));
const resolvers_1 = __importDefault(require("./resolvers"));
async function createServer(emitSchemaFile = false) {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    // await initDB();
    logger.info(`Building schema emitSchemaFile: ${emitSchemaFile}`);
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.default,
        emitSchemaFile: emitSchemaFile ? path_1.default.resolve(__dirname, 'utils', 'schema.gql') : undefined,
        container,
        validate: false,
        authChecker: auth_middleware_1.default,
    });
    logger.info('Creating server');
    const server = new server_1.ApolloServer({
        schema,
        logger,
    });
    return server;
}
exports.default = createServer;
