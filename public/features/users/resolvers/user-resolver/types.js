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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.NewUser = exports.AuthUserResponse = exports.UserResponse = void 0;
const type_graphql_1 = require("type-graphql");
let UserResponse = class UserResponse {
    constructor(props) {
        Object.assign(this, {
            ...props,
            password: undefined,
        });
    }
};
exports.UserResponse = UserResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "email", void 0);
exports.UserResponse = UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], UserResponse);
let AuthUserResponse = class AuthUserResponse {
    constructor(props) {
        Object.assign(this, props);
    }
};
exports.AuthUserResponse = AuthUserResponse;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", UserResponse)
], AuthUserResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AuthUserResponse.prototype, "auth", void 0);
exports.AuthUserResponse = AuthUserResponse = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [AuthUserResponse])
], AuthUserResponse);
let NewUser = class NewUser {
};
exports.NewUser = NewUser;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], NewUser.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], NewUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], NewUser.prototype, "password", void 0);
exports.NewUser = NewUser = __decorate([
    (0, type_graphql_1.InputType)()
], NewUser);
let UpdateUser = class UpdateUser {
};
exports.UpdateUser = UpdateUser;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUser.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateUser.prototype, "email", void 0);
exports.UpdateUser = UpdateUser = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateUser);
