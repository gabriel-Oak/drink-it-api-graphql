"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDetailsValidationError = exports.DetailsNotFoundError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class DetailsNotFoundError extends base_error_1.default {
    constructor() {
        super('Sorry, couldn\'t find you cocktail');
        this.type = 'datail-not-found';
    }
}
exports.DetailsNotFoundError = DetailsNotFoundError;
class GetDetailsValidationError extends base_error_1.default {
    constructor() {
        super('Sorry, you need to specify a cocktail id to search');
        this.type = 'get-detail-validation';
    }
}
exports.GetDetailsValidationError = GetDetailsValidationError;
