"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalUserDatasourceError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class InternalUserDatasourceError extends base_error_1.default {
    constructor() {
        super(...arguments);
        this.type = 'internal-user-datasource';
    }
}
exports.InternalUserDatasourceError = InternalUserDatasourceError;
