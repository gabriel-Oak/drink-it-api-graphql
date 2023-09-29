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
let GetByNameUsecase = class GetByNameUsecase {
    constructor(internalDatasource, externalDatasource) {
        this.internalDatasource = internalDatasource;
        this.externalDatasource = externalDatasource;
    }
    async execute(name) {
        const externalCocktails = await this.externalDatasource.getCocktailsByName(name);
        if (externalCocktails.isSuccess && externalCocktails.success?.length) {
            this.save(externalCocktails.success);
            return externalCocktails;
        }
        const internallCocktails = await this.internalDatasource.findByName(name);
        return internallCocktails;
    }
    async save(cocktails) {
        for (const cocktail of cocktails) {
            await this.internalDatasource.saveOne(cocktail).catch();
        }
    }
};
GetByNameUsecase = __decorate([
    (0, injectable_1.default)('IGetByNameUsecase'),
    __param(0, (0, inversify_1.inject)('IInternalCocktailDatasource')),
    __param(1, (0, inversify_1.inject)('ICocktailExternalDatasource')),
    __metadata("design:paramtypes", [Object, Object])
], GetByNameUsecase);
exports.default = GetByNameUsecase;
