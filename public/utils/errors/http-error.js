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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const base_error_1 = __importDefault(require("./base-error"));
let HttpError = class HttpError extends base_error_1.default {
    constructor(props) {
        const { message, statusCode, meta } = props ?? {};
        const defaultMessage = 'Tivemos algum problema desconhecido';
        const defaultStatusCode = 500;
        super(message ?? defaultMessage, process.env.NODE_ENV !== 'production' ? meta : undefined);
        this.type = 'http-error';
        this.toString = () => `${this.statusCode}: ${this.message}${this.meta
            ? ` | \n${JSON.stringify(this.meta)}`
            : ''}`;
        this.statusCode = statusCode ?? defaultStatusCode;
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], HttpError.prototype, "statusCode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], HttpError.prototype, "message", void 0);
HttpError = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], HttpError);
exports.default = HttpError;
