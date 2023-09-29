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
const type_graphql_1 = require("type-graphql");
const resolver_1 = __importDefault(require("../../../../utils/decorators/resolver"));
const cocktail_1 = __importDefault(require("../../entities/cocktail"));
const types_1 = require("./types");
const http_error_1 = __importDefault(require("../../../../utils/errors/http-error"));
let CocktailResolver = class CocktailResolver {
    constructor(getCocktailsUsecase, getDetailUsecase, getRandomUsecase, getByNameUsecase) {
        this.getCocktailsUsecase = getCocktailsUsecase;
        this.getDetailUsecase = getDetailUsecase;
        this.getRandomUsecase = getRandomUsecase;
        this.getByNameUsecase = getByNameUsecase;
    }
    async getCocktails(query) {
        if (!query || !Object.values(query).some(Boolean)) {
            return new http_error_1.default({
                message: 'Sorry, you need to specify a searching parameter',
                statusCode: 400,
            });
        }
        const result = await this.getCocktailsUsecase.execute(query);
        if (result.isSuccess)
            return result.success;
        return new http_error_1.default(result.error);
    }
    async getCocktailDetail(cocktailId) {
        const result = await this.getDetailUsecase.execute(cocktailId);
        if (result.isSuccess)
            return result.success;
        return new http_error_1.default({
            ...result.error,
            statusCode: result.error.type === 'get-detail-validation' ? 400 : 500,
        });
    }
    async getRandomCocktail() {
        const result = await this.getRandomUsecase.execute();
        if (result.isSuccess)
            return result.success;
        return new http_error_1.default(result.error);
    }
    async getCocktailsByName(cocktailName) {
        const result = await this.getByNameUsecase.execute(cocktailName);
        if (result.isSuccess)
            return result.success;
        return new http_error_1.default(result.error);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [cocktail_1.default]),
    __param(0, (0, type_graphql_1.Arg)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.CocktailQuery]),
    __metadata("design:returntype", Promise)
], CocktailResolver.prototype, "getCocktails", null);
__decorate([
    (0, type_graphql_1.Query)(() => cocktail_1.default),
    __param(0, (0, type_graphql_1.Arg)('cocktailId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CocktailResolver.prototype, "getCocktailDetail", null);
__decorate([
    (0, type_graphql_1.Query)(() => cocktail_1.default),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CocktailResolver.prototype, "getRandomCocktail", null);
__decorate([
    (0, type_graphql_1.Query)(() => [cocktail_1.default]),
    __param(0, (0, type_graphql_1.Arg)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CocktailResolver.prototype, "getCocktailsByName", null);
CocktailResolver = __decorate([
    (0, resolver_1.default)(),
    __param(0, (0, inversify_1.inject)('IGetCocktailsUsecase')),
    __param(1, (0, inversify_1.inject)('IGetDetailsUsecase')),
    __param(2, (0, inversify_1.inject)('IGetRandomUsecase')),
    __param(3, (0, inversify_1.inject)('IGetByNameUsecase')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CocktailResolver);
exports.default = CocktailResolver;
