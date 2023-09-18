"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("../../decorators/container"));
const http_error_1 = __importDefault(require("../../errors/http-error"));
const context = async ({ req, event, }) => {
    let user;
    let authError;
    const { headers } = req || event;
    const token = headers.authorization;
    if (token) {
        const container = (0, container_1.default)();
        const decodeUser = container.get('IDecodeUserTokenUsecase');
        const decodeResult = await decodeUser.execute(token);
        if (decodeResult.isError) {
            authError = new http_error_1.default({ statusCode: 401, ...decodeResult.error });
        }
        else {
            user = decodeResult.success;
            delete user.password;
        }
    }
    return {
        headers,
        user,
        authError,
    };
};
exports.default = context;
