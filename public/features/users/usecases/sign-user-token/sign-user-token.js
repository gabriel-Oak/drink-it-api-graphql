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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_1 = require("inversify");
const user_1 = __importDefault(require("../../entities/user"));
const constants_1 = require("../../../../utils/constants");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
let SignUserTokenUsecase = class SignUserTokenUsecase {
    constructor(cache) {
        this.cache = cache;
    }
    execute(user) {
        const newUser = new user_1.default({ ...user, password: undefined });
        this.cache.set(`user:${user.id}`, newUser);
        return jsonwebtoken_1.default.sign(newUser.getProps(), constants_1.JWT_SECRET, { expiresIn: '5 days' });
    }
};
SignUserTokenUsecase = __decorate([
    (0, injectable_1.default)('ISignUserTokenUsecase'),
    __param(0, (0, inversify_1.inject)('ICacheService')),
    __metadata("design:paramtypes", [Object])
], SignUserTokenUsecase);
exports.default = SignUserTokenUsecase;
