"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const constants_1 = require("../../constants");
require("./cache-service");
const container_1 = __importDefault(require("../../decorators/container"));
(0, container_1.default)().bind('RedisClient')
    .toDynamicValue(() => new ioredis_1.default({
    port: +constants_1.REDIS_PORT,
    host: constants_1.REDIS_HOST,
    password: constants_1.REDIS_PASS,
    keyPrefix: 'cache',
}));
