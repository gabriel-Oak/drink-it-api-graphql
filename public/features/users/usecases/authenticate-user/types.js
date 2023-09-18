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
exports.AuthenticateUserWrongPasswordError = exports.AuthenticateUserNotFoundError = exports.AuthenticateInvalidError = exports.LoginPayload = void 0;
const type_graphql_1 = require("type-graphql");
const base_error_1 = __importDefault(require("../../../../utils/errors/base-error"));
let LoginPayload = class LoginPayload {
};
exports.LoginPayload = LoginPayload;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginPayload.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginPayload.prototype, "password", void 0);
exports.LoginPayload = LoginPayload = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginPayload);
class AuthenticateInvalidError extends base_error_1.default {
    constructor() {
        super('Oh looks like you didn\'t specify an email or a password :O');
        this.type = 'authenticate-invalid';
    }
}
exports.AuthenticateInvalidError = AuthenticateInvalidError;
class AuthenticateUserNotFoundError extends base_error_1.default {
    constructor() {
        super('Sorry we couldn\'t find any user for this email =/');
        this.type = 'authenticate-user-not-found';
    }
}
exports.AuthenticateUserNotFoundError = AuthenticateUserNotFoundError;
class AuthenticateUserWrongPasswordError extends base_error_1.default {
    constructor() {
        super('Wrong password, please try again ;)');
        this.type = 'authenticate-user-wrong-password';
    }
}
exports.AuthenticateUserWrongPasswordError = AuthenticateUserWrongPasswordError;
