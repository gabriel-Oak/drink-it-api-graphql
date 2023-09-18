"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./datasources");
const cocktail_resolver_1 = __importDefault(require("./resolvers/cocktail-resolver"));
require("./usecases");
const cocktailResolvers = [
    cocktail_resolver_1.default,
];
exports.default = cocktailResolvers;
