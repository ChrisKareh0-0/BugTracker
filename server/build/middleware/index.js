"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var unknownEndpoint_1 = __importDefault(require("./unknownEndpoint"));
var errorHandler_1 = __importDefault(require("./errorHandler"));
var authChecker_1 = __importDefault(require("./authChecker"));
exports.default = { unknownEndPointHandler: unknownEndpoint_1.default, errorHandler: errorHandler_1.default, auth: authChecker_1.default };
//# sourceMappingURL=index.js.map