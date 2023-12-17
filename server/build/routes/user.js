"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var middleware_1 = __importDefault(require("../middleware"));
var router = express_1.default.Router();
var auth = middleware_1.default.auth;
router.get('/', auth, user_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=user.js.map