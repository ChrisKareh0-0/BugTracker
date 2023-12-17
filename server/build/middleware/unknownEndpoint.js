"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unknownEndPointHandler = function (_req, res) {
    res.status(404).send({ message: 'Unknown endpoint.' });
};
exports.default = unknownEndPointHandler;
//# sourceMappingURL=unknownEndpoint.js.map