"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (error, _req, res, next) {
    console.error(error.message);
    if (error.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Invalid token.' });
    }
    else if (error.message) {
        return res.status(400).send({ message: error.message });
    }
    else {
        res.status(400).send({ message: 'Something went wrong.' });
    }
    next(error);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map