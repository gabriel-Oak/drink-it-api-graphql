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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
const types_1 = require("../../../../utils/types");
const types_2 = require("./types");
let ChangePasswordUsecase = class ChangePasswordUsecase {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    async execute(payload) {
        if (!payload.newPassword || !payload.oldPassword) {
            return new types_1.Left(new types_2.ChangePasswordInvalidPassError());
        }
        const userResult = await this.userDatasource.findById(payload.userId);
        if (userResult.isError)
            return userResult;
        if (!userResult.success)
            return new types_1.Left(new types_2.ChangePasswordInvalidPassError());
        const { success: user } = userResult;
        const oldPassIsValid = await user.comparePasswords(payload.oldPassword);
        if (!oldPassIsValid)
            return new types_1.Left(new types_2.ChangePasswordInvalidOldPassError());
        user.password = payload.newPassword;
        const insertResult = await this.userDatasource.update(user);
        if (insertResult.isError)
            return insertResult;
        return new types_1.Right('All good here, we are done ;)');
    }
};
ChangePasswordUsecase = __decorate([
    (0, injectable_1.default)('IChangePasswordUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalUserDatasource')),
    __metadata("design:paramtypes", [Object])
], ChangePasswordUsecase);
exports.default = ChangePasswordUsecase;
