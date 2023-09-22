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
const typeorm_1 = require("typeorm");
const inversify_1 = require("inversify");
const types_1 = require("../../../../utils/types");
const measure_1 = __importDefault(require("../../entities/measure"));
const types_2 = require("./types");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
let InternalCocktailDatasource = class InternalCocktailDatasource {
    constructor(cocktailRepository, measureRepository, ingredientRepository, logger) {
        this.cocktailRepository = cocktailRepository;
        this.measureRepository = measureRepository;
        this.ingredientRepository = ingredientRepository;
        this.logger = logger;
    }
    async saveOne(cocktail) {
        try {
            const cocktailExists = await this.cocktailRepository.findOne({ where: { id: cocktail.id } });
            if (!cocktailExists)
                await this.cocktailRepository.save(cocktail);
            for (const measure of cocktail.measures) {
                const ingredientExists = await this.ingredientRepository.findOne({
                    where: { name: measure.ingredient.name },
                });
                const newMeasure = new measure_1.default({
                    ...measure,
                    ingredient: ingredientExists ?? await this.ingredientRepository.save(measure.ingredient),
                    cocktail,
                });
                const measureExists = await this.measureRepository.findOne({
                    where: { cocktail, ingredient: newMeasure.ingredient },
                });
                if (!measureExists)
                    await this.measureRepository.save(newMeasure);
            }
            return new types_1.Right(null);
        }
        catch (e) {
            const error = new types_2.InternalCocktailDatasourceError(e.message ?? 'Someting went wrong saving cocktail', {
                error: e,
                cocktailId: cocktail.id,
            });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findOne(cocktailId) {
        try {
            const cocktail = await this.cocktailRepository.findOne({
                where: { id: cocktailId },
                relations: ['measures', 'measures.ingredient'],
            });
            return new types_1.Right(cocktail);
        }
        catch (e) {
            const error = new types_2.InternalCocktailDatasourceError(e.message ?? 'Someting went search cocktail', {
                error: e,
                cocktailId,
            });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findMany(cocktailsIds) {
        try {
            const cocktails = await this.cocktailRepository.find({
                where: {
                    id: (0, typeorm_1.In)(cocktailsIds),
                },
                relations: ['measures', 'measures.ingredient'],
            });
            return new types_1.Right(cocktails);
        }
        catch (e) {
            const error = new types_2.InternalCocktailDatasourceError(e.message ?? 'Someting went search cocktail', {
                error: e,
                cocktailsIds,
            });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findRandom() {
        try {
            const cocktail = await this.cocktailRepository
                .createQueryBuilder('cocktail')
                .leftJoinAndSelect('cocktail.measures', 'measure')
                .leftJoinAndSelect('measure.ingredient', 'ingredient')
                .select()
                .orderBy('RANDOM()')
                .getOne();
            return new types_1.Right(cocktail);
        }
        catch (e) {
            const error = new types_2.InternalCocktailDatasourceError(e.message ?? 'Someting went search cocktail', {
                error: e,
            });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
};
InternalCocktailDatasource = __decorate([
    (0, injectable_1.default)('IInternalCocktailDatasource'),
    __param(0, (0, inversify_1.inject)('Repository<Cocktail>')),
    __param(1, (0, inversify_1.inject)('Repository<Measure>')),
    __param(2, (0, inversify_1.inject)('Repository<Ingredient>')),
    __param(3, (0, inversify_1.inject)('ILoggerService')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository, Object])
], InternalCocktailDatasource);
exports.default = InternalCocktailDatasource;
