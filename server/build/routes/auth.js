"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../controllers/auth");
var router = express_1.default.Router();
router.post('/signup', auth_1.signupUser);
router.post('/login', auth_1.loginUser);
exports.default = router;
//# sourceMappingURL=auth.js.map