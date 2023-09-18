"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./datasources");
require("./usecases");
const user_resolver_1 = __importDefault(require("./resolvers/user-resolver"));
const userResolvers = [
    user_resolver_1.default,
];
exports.default = userResolvers;
