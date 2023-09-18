"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@apollo/server/standalone");
const _1 = require(".");
const container_1 = __importDefault(require("./utils/decorators/container"));
const context_1 = __importDefault(require("./utils/middlewares/context"));
(async () => {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    const server = await (0, _1.main)(true);
    const { url } = await (0, standalone_1.startStandaloneServer)(server, { context: context_1.default });
    logger.info(`Hooray!!! Server UP and running at ${url}`);
})();
