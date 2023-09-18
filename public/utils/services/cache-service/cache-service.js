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
const ioredis_1 = require("ioredis");
const inversify_1 = require("inversify");
const injectable_1 = __importDefault(require("../../decorators/injectable"));
let CacheService = class CacheService {
    constructor(client, logger) {
        this.client = client;
        this.logger = logger;
    }
    async get(key) {
        try {
            let value = await this.client.get(key);
            try {
                value = value ? JSON.parse(value) : null;
            }
            catch (_) {
                return value;
            }
        }
        catch (error) {
            this.logger.warn(error.message ?? error, error);
        }
        return null;
    }
    async set(key, value, expirationSeconds = 60 * 60) {
        try {
            await this.client.set(key, JSON.stringify(value), 'EX', expirationSeconds);
        }
        catch (error) {
            this.logger.warn(error.message ?? error, error);
        }
    }
    async del(args) {
        try {
            return await this.client.del(args);
        }
        catch (error) {
            this.logger.warn(error.message ?? error, error);
        }
        return null;
    }
    async delPrefix(prefix) {
        try {
            let keys = await this.client.keys(`cache:${prefix}`);
            keys = keys.map((key) => key.replace('cahce:', ''));
            return await this.del(keys);
        }
        catch (error) {
            this.logger.warn(error.message ?? error, error);
        }
        return null;
    }
};
CacheService = __decorate([
    (0, injectable_1.default)('ICacheService'),
    __param(0, (0, inversify_1.inject)('RedisClient')),
    __param(1, (0, inversify_1.inject)('ILoggerService')),
    __metadata("design:paramtypes", [ioredis_1.Redis, Object])
], CacheService);
exports.default = CacheService;
