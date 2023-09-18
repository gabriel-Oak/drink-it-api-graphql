"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const container_1 = __importDefault(require("../../decorators/container"));
require("./logger-service");
(0, container_1.default)().bind('Logger')
    .toDynamicValue(() => (0, winston_1.createLogger)());
