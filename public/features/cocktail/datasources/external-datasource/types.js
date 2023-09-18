"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CocktailDatasourceError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class CocktailDatasourceError extends base_error_1.default {
    constructor() {
        super(...arguments);
        this.type = 'coktail-datasource';
    }
}
exports.CocktailDatasourceError = CocktailDatasourceError;
