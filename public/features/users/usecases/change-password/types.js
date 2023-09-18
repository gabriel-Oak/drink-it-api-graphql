"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.ChangePasswordInvalidOldPassError = exports.ChangePasswordInvalidPassError = void 0;
const type_graphql_1 = require("type-graphql");
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
class ChangePasswordInvalidPassError extends base_error_1.default {
    constructor(message) {
        super(message ?? 'Invalid passwords informed, check if its spelled right and try again');
        this.type = 'change-password-invalid-pass';
    }
}
exports.ChangePasswordInvalidPassError = ChangePasswordInvalidPassError;
class ChangePasswordInvalidOldPassError extends ChangePasswordInvalidPassError {
    constructor() {
        super('Invalid old password, check if its spelled right and try again');
    }
}
exports.ChangePasswordInvalidOldPassError = ChangePasswordInvalidOldPassError;
let ChangePassword = class ChangePassword {
};
exports.ChangePassword = ChangePassword;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ChangePassword.prototype, "oldPassword", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ChangePassword.prototype, "newPassword", void 0);
exports.ChangePassword = ChangePassword = __decorate([
    (0, type_graphql_1.InputType)()
], ChangePassword);
