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
let GetCocktailsUsecase = class GetCocktailsUsecase {
    constructor(externalDatasource, internalDatasource, cacheService) {
        this.externalDatasource = externalDatasource;
        this.internalDatasource = internalDatasource;
        this.cacheService = cacheService;
        this.getDetails = this.getDetails.bind(this);
        this.execute = this.execute.bind(this);
        this.saveCocktails = this.saveCocktails.bind(this);
    }
    async saveCocktails(cocktails) {
        for (const cocktail of cocktails) {
            await this.internalDatasource.saveOne(cocktail);
        }
    }
    async getDetails(cocktails) {
        // Get previusly storaged cocktails
        const internalResults = await this.internalDatasource.findMany(cocktails.map((c) => c.idDrink));
        const internalCocktails = {};
        if (!internalResults.isError) {
            internalResults.success.forEach((cocktail) => { internalCocktails[cocktail.id] = cocktail; });
        }
        // Get the others from api
        const externalResults = await Promise.all(cocktails
            .filter(({ idDrink }) => !internalCocktails[idDrink])
            .map(async ({ idDrink }) => this.externalDatasource.getCocktailDetail(idDrink)));
        const externalCocktails = {};
        externalResults.forEach((result) => {
            if (!result.isError && result.success) {
                externalCocktails[result.success.id] = result.success;
            }
        });
        // Saves only what doesn't exist in storage
        this.saveCocktails(Object.values(externalCocktails));
        // Assemble final result and BAMM
        const finalResult = [];
        cocktails.forEach(({ idDrink }) => {
            if (internalCocktails[idDrink])
                return finalResult.push(internalCocktails[idDrink]);
            if (externalCocktails[idDrink])
                return finalResult.push(externalCocktails[idDrink]);
        });
        return finalResult;
    }
    async execute(query) {
        const encodedQuery = `${Object.keys(query)[0]}${encodeURIComponent(Object.values(query)[0])}`;
        const cache = await this.cacheService.get(`cocktail:list:${encodedQuery}`);
        if (cache)
            return new types_1.Right(cache);
        const listResult = await this.externalDatasource.getCocktailsList(query);
        if (listResult.isError)
            return listResult;
        const cocktails = await this.getDetails(listResult.success || []);
        this.cacheService.set(`cocktail:list:${encodedQuery}`, cocktails);
        return new types_1.Right(cocktails);
    }
};
GetCocktailsUsecase = __decorate([
    (0, injectable_1.default)('IGetCocktailsUsecase'),
    __param(0, (0, inversify_1.inject)('ICocktailExternalDatasource')),
    __param(1, (0, inversify_1.inject)('IInternalCocktailDatasource')),
    __param(2, (0, inversify_1.inject)('ICacheService')),
    __metadata("design:paramtypes", [Object, Object, Object])
], GetCocktailsUsecase);
exports.default = GetCocktailsUsecase;
