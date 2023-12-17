"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../utils/config");
var authChecker = function (req, res, next) {
    try {
        var token = req.header('x-auth-token');
        if (!token) {
            return res
                .status(401)
                .send({ message: 'No auth token found. Authorization denied.' });
        }
        var decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!decodedToken.id) {
            return res
                .status(401)
                .send({ message: 'Token verification failed. Authorization denied.' });
        }
        req.user = decodedToken.id;
        next();
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.default = authChecker;
//# sourceMappingURL=authChecker.js.map