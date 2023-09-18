"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./features/users"));
const cocktail_1 = __importDefault(require("./features/cocktail"));
const resolvers = [
    ...users_1.default,
    ...cocktail_1.default,
    // eslint-disable-next-line @typescript-eslint/ban-types
];
exports.default = resolvers;
