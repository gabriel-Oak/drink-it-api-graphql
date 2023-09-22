"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomNotFoundError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class RandomNotFoundError extends base_error_1.default {
    constructor() {
        super('Sorry, couldn\'t find you a random cocktail now');
        this.type = 'random-not-found';
    }
}
exports.RandomNotFoundError = RandomNotFoundError;
