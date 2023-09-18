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
const type_graphql_1 = require("type-graphql");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const resolver_1 = __importDefault(require("../../../../utils/decorators/resolver"));
const http_error_1 = __importDefault(require("../../../../utils/errors/http-error"));
const types_2 = require("../../usecases/change-password/types");
let UserResolver = class UserResolver {
    constructor(helloUsecasse, authUserUsecase, signUserTokenUsecase, validateUserUsecase, insertUserUsecase, changePasswordUsecase, updateUserUsecase) {
        this.helloUsecasse = helloUsecasse;
        this.authUserUsecase = authUserUsecase;
        this.signUserTokenUsecase = signUserTokenUsecase;
        this.validateUserUsecase = validateUserUsecase;
        this.insertUserUsecase = insertUserUsecase;
        this.changePasswordUsecase = changePasswordUsecase;
        this.updateUserUsecase = updateUserUsecase;
    }
    async hello() {
        return this.helloUsecasse.execute();
    }
    async authenticateUser(email, password) {
        const authResult = await this.authUserUsecase.execute({ email, password });
        if (authResult.isError) {
            const error = new http_error_1.default({
                ...authResult.error,
                statusCode: {
                    'authenticate-user-not-found': 404,
                    'authenticate-user-wrong-password': 403,
                    'authenticate-invalid': 400,
                }[String(authResult.error.type)] ?? 500,
            });
            return error;
        }
        const { success: user } = authResult;
        delete user.password;
        const auth = this.signUserTokenUsecase.execute(user);
        return new types_1.AuthUserResponse({
            user: new types_1.UserResponse(user),
            auth,
        });
    }
    async createUser(newUser) {
        const validate = this.validateUserUsecase.execute(newUser);
        if (validate.isError) {
            return new http_error_1.default({
                ...validate.error,
                statusCode: 400,
            });
        }
        const insertResult = await this.insertUserUsecase.execute(newUser);
        if (insertResult.isError) {
            const error = new http_error_1.default(insertResult.error);
            if (insertResult.error.type === 'insert-user-already-exist')
                error.statusCode = 409;
            return error;
        }
        const { success: user } = insertResult;
        delete user.password;
        const auth = this.signUserTokenUsecase.execute(user);
        return new types_1.AuthUserResponse({
            user: new types_1.UserResponse(user),
            auth,
        });
    }
    async refreshUserToken(ctx) {
        const { user } = ctx;
        const auth = this.signUserTokenUsecase.execute(user);
        return new types_1.AuthUserResponse({
            user: new types_1.UserResponse(user),
            auth,
        });
    }
    async changeUserPassword(payload, ctx) {
        const { user } = ctx;
        const result = await this.changePasswordUsecase.execute({
            ...payload,
            userId: user.id,
        });
        if (result.isSuccess)
            return result.success;
        return new http_error_1.default({ statusCode: 400, ...result.error });
    }
    async updateUser(newUser, ctx) {
        const { user } = ctx;
        const result = await this.updateUserUsecase.execute(user, newUser);
        if (result.isSuccess)
            return result.success;
        return new http_error_1.default(result.error);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "hello", null);
__decorate([
    (0, type_graphql_1.Query)(() => types_1.AuthUserResponse),
    __param(0, (0, type_graphql_1.Arg)('email')),
    __param(1, (0, type_graphql_1.Arg)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "authenticateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.AuthUserResponse),
    __param(0, (0, type_graphql_1.Arg)('newUser')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.NewUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)(() => types_1.AuthUserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "refreshUserToken", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)('payload')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.ChangePassword, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changeUserPassword", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(() => String),
    __param(0, (0, type_graphql_1.Arg)('user')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UpdateUser, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    (0, resolver_1.default)(),
    __param(0, (0, inversify_1.inject)('IHelloUsecase')),
    __param(1, (0, inversify_1.inject)('IAuthenticateUserUsecase')),
    __param(2, (0, inversify_1.inject)('ISignUserTokenUsecase')),
    __param(3, (0, inversify_1.inject)('IValidateUserUsecase')),
    __param(4, (0, inversify_1.inject)('IInsertUserUsecase')),
    __param(5, (0, inversify_1.inject)('IChangePasswordUsecase')),
    __param(6, (0, inversify_1.inject)('IUpdateUserUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], UserResolver);
exports.default = UserResolver;
