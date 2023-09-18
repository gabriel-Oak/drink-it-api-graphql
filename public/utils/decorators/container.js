"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let container = new inversify_1.Container();
const createContainer = () => {
    if (!container)
        container = new inversify_1.Container();
    return container;
};
exports.default = createContainer;
