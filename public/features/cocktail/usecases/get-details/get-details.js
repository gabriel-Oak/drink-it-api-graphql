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
const type_1 = require("./type");
let GetDetailsUsecase = class GetDetailsUsecase {
    constructor(externalDatasource, internalDatasource) {
        this.externalDatasource = externalDatasource;
        this.internalDatasource = internalDatasource;
    }
    async execute(cocktailId) {
        if (!cocktailId)
            return new types_1.Left(new type_1.GetDetailsValidationError());
        const internalCocktail = await this.internalDatasource.findOne(cocktailId);
        if (!internalCocktail.isError && internalCocktail.success) {
            return internalCocktail;
        }
        const externalCocktail = await this.externalDatasource.getCocktailDetail(cocktailId);
        if (!externalCocktail.isError && externalCocktail.success) {
            this.internalDatasource.saveOne(externalCocktail.success);
            return externalCocktail;
        }
        return new types_1.Left(new type_1.DetailsNotFoundError());
    }
};
GetDetailsUsecase = __decorate([
    (0, injectable_1.default)('IGetDetailsUsecase'),
    __param(0, (0, inversify_1.inject)('ICocktailExternalDatasource')),
    __param(1, (0, inversify_1.inject)('IInternalCocktailDatasource')),
    __metadata("design:paramtypes", [Object, Object])
], GetDetailsUsecase);
exports.default = GetDetailsUsecase;
