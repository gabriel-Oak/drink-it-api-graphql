"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const type_graphql_1 = require("type-graphql");
const container_1 = __importDefault(require("./container"));
const Resolver = () => (target) => {
    const inject = (0, inversify_1.injectable)();
    inject(target);
    const container = (0, container_1.default)();
    container.bind(target).toSelf();
    const resolver = (0, type_graphql_1.Resolver)();
    resolver(target);
    return target;
};
exports.default = Resolver;
