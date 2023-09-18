"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const server_1 = __importDefault(require("./server"));
const context_1 = __importDefault(require("./utils/middlewares/context"));
const port = process.env.port || 3000;
const app = (0, express_1.default)();
app.get('/ping', async (_req, res) => {
    res.json('pong 🏓');
});
app.listen(port);
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use('/graphql', async (req, res, next) => {
    const server = await (0, server_1.default)();
    await server.start();
    return (0, express4_1.expressMiddleware)(server, { context: context_1.default })(req, res, next);
});
exports.default = app;
