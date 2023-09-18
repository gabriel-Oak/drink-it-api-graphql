"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeUserNotFoundError = exports.DecodeUserInvalidTokenError = void 0;
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class DecodeUserInvalidTokenError extends base_error_1.default {
    constructor() {
        super('Sorry token format is not valid, try to sing in again');
        this.type = 'decode-user-invalid-token';
    }
}
exports.DecodeUserInvalidTokenError = DecodeUserInvalidTokenError;
class DecodeUserNotFoundError extends base_error_1.default {
    constructor() {
        super('User not found, try to sing in again');
        this.type = 'decode-user-not-found';
    }
}
exports.DecodeUserNotFoundError = DecodeUserNotFoundError;
