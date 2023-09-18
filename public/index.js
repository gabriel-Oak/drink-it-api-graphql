"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
require("reflect-metadata");
require("./config");
const path_1 = __importDefault(require("path"));
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const container_1 = __importDefault(require("./utils/decorators/container"));
const resolvers_1 = __importDefault(require("./resolvers"));
require("./utils/services");
const context_1 = __importDefault(require("./utils/middlewares/context"));
const auth_middleware_1 = __importDefault(require("./utils/middlewares/auth-middleware"));
const datatabase_service_1 = require("./utils/services/datatabase-service");
const port = process.env.port || 3000;
const app = (0, express_1.default)();
async function main() {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    await (0, datatabase_service_1.initDB)();
    logger.info('Building schema');
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.default,
        emitSchemaFile: path_1.default.resolve(__dirname, 'utils', 'schema.gql'),
        container,
        validate: false,
        authChecker: auth_middleware_1.default,
    });
    logger.info('Creating server');
    const server = new server_1.ApolloServer({
        schema,
        logger,
    });
    await server.start();
    app.use('/**', (0, cors_1.default)(), (0, body_parser_1.json)(), (0, express4_1.expressMiddleware)(server, {
        context: context_1.default,
    }));
    logger.info(`Hooray!!! Server UP and running at port ${port}`);
}
exports.main = main;
main();
app.listen(port);
exports.default = app;
