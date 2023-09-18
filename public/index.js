"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
require("reflect-metadata");
require("./config");
require("./utils/services");
const standalone_1 = require("@apollo/server/standalone");
const context_1 = __importDefault(require("./utils/middlewares/context"));
const container_1 = __importDefault(require("./utils/decorators/container"));
const server_1 = __importDefault(require("./server"));
async function main() {
    const container = (0, container_1.default)();
    const logger = container.get('ILoggerService');
    const server = await (0, server_1.default)(true);
    const { url } = await (0, standalone_1.startStandaloneServer)(server, { context: context_1.default });
    logger.info(`Hooray!!! Server UP and running at ${url}`);
}
main();
