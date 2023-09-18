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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Cocktail_1;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const measure_1 = __importDefault(require("./measure"));
const ingredient_1 = __importDefault(require("./ingredient"));
const nullable = { nullable: true };
let Cocktail = Cocktail_1 = class Cocktail {
    constructor(props) {
        Object.assign(this, {
            ...props,
            measures: props?.measures.map((i) => new measure_1.default(i)),
        });
    }
    static fromSource(props) {
        const measures = [];
        Object.keys(props).forEach((key) => {
            if (key.includes('Ingredient') && !!props[key]) {
                measures.push(new measure_1.default({
                    measure: props[`strMeasure${key.split('Ingredient')[1]}`],
                    ingredient: new ingredient_1.default({
                        name: props[key],
                    }),
                }));
            }
        });
        return new Cocktail_1({
            id: props.idDrink,
            name: props.strDrink,
            thumb: props.strDrinkThumb,
            tags: props.strTags,
            category: props.strCategory,
            alcoholic: props.strAlcoholic,
            glass: props.strGlass,
            video: props.strVideo,
            instructions: props.strInstructions,
            instructionsES: props.strInstructionsES,
            instructionsDE: props.strInstructionsDE,
            instructionsFR: props.strInstructionsFR,
            instructionsIT: props.strInstructionsIT,
            dateModified: props.dateModified,
            iba: props.strIBA,
            measures,
        });
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Cocktail.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cocktail.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cocktail.prototype, "thumb", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cocktail.prototype, "alcoholic", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cocktail.prototype, "glass", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [measure_1.default]),
    (0, typeorm_1.OneToMany)(() => measure_1.default, (ingredient) => ingredient.cocktail),
    __metadata("design:type", Array)
], Cocktail.prototype, "measures", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)(nullable),
    __metadata("design:type", String)
], Cocktail.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)(nullable),
    __metadata("design:type", String)
], Cocktail.prototype, "video", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)(nullable),
    __metadata("design:type", String)
], Cocktail.prototype, "tags", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Cocktail.prototype, "instructions", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)({
        ...nullable,
        type: 'text',
    }),
    __metadata("design:type", String)
], Cocktail.prototype, "instructionsES", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)({
        ...nullable,
        type: 'text',
    }),
    __metadata("design:type", String)
], Cocktail.prototype, "instructionsDE", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)({
        ...nullable,
        type: 'text',
    }),
    __metadata("design:type", String)
], Cocktail.prototype, "instructionsFR", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)({
        ...nullable,
        type: 'text',
    }),
    __metadata("design:type", String)
], Cocktail.prototype, "instructionsIT", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)({
        ...nullable,
        type: 'text',
    }),
    __metadata("design:type", String)
], Cocktail.prototype, "instructionsPtBR", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)(nullable),
    __metadata("design:type", String)
], Cocktail.prototype, "dateModified", void 0);
__decorate([
    (0, type_graphql_1.Field)(nullable),
    (0, typeorm_1.Column)(nullable),
    __metadata("design:type", String)
], Cocktail.prototype, "iba", void 0);
Cocktail = Cocktail_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Cocktail])
], Cocktail);
exports.default = Cocktail;
