"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(message, meta) {
        super();
        this.message = message;
        this.meta = meta;
    }
}
exports.default = BaseError;
