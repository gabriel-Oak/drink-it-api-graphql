"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const container_1 = __importDefault(require("../../decorators/container"));
require("./http-service");
(0, container_1.default)().bind('Axios')
    .toDynamicValue(() => axios_1.default.create());
