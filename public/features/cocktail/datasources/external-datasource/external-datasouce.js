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
const constants_1 = require("../../../../utils/constants");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
const types_1 = require("../../../../utils/types");
const cocktail_1 = __importDefault(require("../../entities/cocktail"));
const types_2 = require("./types");
let CocktailExternalDatasource = class CocktailExternalDatasource {
    constructor(httpService, logger) {
        this.httpService = httpService;
        this.logger = logger;
    }
    async getCocktailsList(query) {
        try {
            const result = await this.httpService.get(`${constants_1.COCKTAIL_API}/filter.php`, {
                params: query,
            });
            return new types_1.Right(result.drinks);
        }
        catch (e) {
            const error = new types_2.CocktailDatasourceError('Something went wrong consulting cocktails service', { error: e, query });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async getCocktailDetail(cocktailId) {
        try {
            const result = await this.httpService.get(`${constants_1.COCKTAIL_API}/lookup.php`, {
                params: { i: cocktailId },
            });
            return new types_1.Right(result.drinks?.[0]
                ? cocktail_1.default.fromSource(result.drinks?.[0])
                : null);
        }
        catch (e) {
            const error = new types_2.CocktailDatasourceError('Something wen wrong consulting cocktails service', { error: e, cocktailId });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
};
CocktailExternalDatasource = __decorate([
    (0, injectable_1.default)('ICocktailExternalDatasource'),
    __param(0, (0, inversify_1.inject)('IHttpService')),
    __param(1, (0, inversify_1.inject)('ILoggerService')),
    __metadata("design:paramtypes", [Object, Object])
], CocktailExternalDatasource);
exports.default = CocktailExternalDatasource;
