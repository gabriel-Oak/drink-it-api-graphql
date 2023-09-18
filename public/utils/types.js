"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Right = exports.Left = void 0;
/* eslint-disable max-classes-per-file */
class Left {
    constructor(error) {
        this.isError = true;
        this.isSuccess = false;
        this.error = error;
    }
}
exports.Left = Left;
class Right {
    constructor(success) {
        this.isError = false;
        this.isSuccess = true;
        this.success = success;
    }
}
exports.Right = Right;
