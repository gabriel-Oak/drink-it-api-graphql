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
const types_2 = require("./types");
const injectable_1 = __importDefault(require("../../../../utils/decorators/injectable"));
let InternalUserDatasource = class InternalUserDatasource {
    constructor(userRepository, logger, initDB) {
        this.userRepository = userRepository;
        this.logger = logger;
        this.initDB = initDB;
    }
    async connect(tries = 0) {
        if (tries === 10) {
            return new types_1.Left(new types_2.InternalUserDatasourceError('Couldn\'t connect the database after 10 tries'));
        }
        const initialized = await new Promise((r) => {
            setTimeout(() => {
                this.initDB().then(r);
            }, tries ? +(process.env.CONNECTION_TIMEOUT || 3000) : 0);
        });
        return initialized ? new types_1.Right(null) : this.connect(tries + 1);
    }
    async findByEmail(email) {
        const connectionResult = await this.connect();
        if (connectionResult.isError)
            return connectionResult;
        try {
            const user = await this.userRepository.findOneBy({ email });
            return new types_1.Right(user);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, sorry got an error searching for ${email}`, { ...e, email });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findByEmailOrUsername(query) {
        const connectionResult = await this.connect();
        if (connectionResult.isError)
            return connectionResult;
        try {
            const user = await this.userRepository.findOneBy([
                { email: query.email },
            ]);
            delete user?.password;
            return new types_1.Right(user);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, sorry got an error searching for ${query.email}`, { ...e, query });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async findById(userId) {
        const connectionResult = await this.connect();
        if (connectionResult.isError)
            return connectionResult;
        try {
            const user = await this.userRepository.findOneBy({ id: userId });
            return new types_1.Right(user);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, sorry got an error searching for id${userId}`, { ...e, userId });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async save(user) {
        const connectionResult = await this.connect();
        if (connectionResult.isError)
            return connectionResult;
        try {
            const result = await this.userRepository.save(user);
            delete result.password;
            return new types_1.Right(result);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, sorry got an error saving user${user.name}`, { ...e, user });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async update(user) {
        const connectionResult = await this.connect();
        if (connectionResult.isError)
            return connectionResult;
        try {
            await this.userRepository.update(user.id, user);
            return new types_1.Right(null);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, sorry got an error saving user${user.name}`, { ...e, user });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
    async remove(userId) {
        const connectionResult = await this.connect();
        if (connectionResult.isError)
            return connectionResult;
        try {
            const user = await this.userRepository.findOneBy({ id: userId });
            if (!user)
                throw new Error(`Oops, user ${userId} not found, might be already deleted`);
            const result = await this.userRepository.remove(user);
            delete result?.password;
            return new types_1.Right(result);
        }
        catch (e) {
            const error = new types_2.InternalUserDatasourceError(e.message || `Oops, sorry got an error searching for id${userId}`, { ...e, userId });
            this.logger.error(error.message, error);
            return new types_1.Left(error);
        }
    }
};
InternalUserDatasource = __decorate([
    (0, injectable_1.default)('IInternalUserDatasource'),
    __param(0, (0, inversify_1.inject)('Repository<User>')),
    __param(1, (0, inversify_1.inject)('ILoggerService')),
    __param(2, (0, inversify_1.inject)('initDB')),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object, Function])
], InternalUserDatasource);
exports.default = InternalUserDatasource;
