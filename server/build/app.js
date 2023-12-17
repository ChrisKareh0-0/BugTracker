"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var middleware_1 = __importDefault(require("./middleware"));
var auth_1 = __importDefault(require("./routes/auth"));
var project_1 = __importDefault(require("./routes/project"));
var member_1 = __importDefault(require("./routes/member"));
var bug_1 = __importDefault(require("./routes/bug"));
var note_1 = __importDefault(require("./routes/note"));
var user_1 = __importDefault(require("./routes/user"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/', auth_1.default);
app.use('/users', user_1.default);
app.use('/projects', project_1.default);
app.use('/projects', member_1.default);
app.use('/projects', bug_1.default);
app.use('/projects', note_1.default);
app.use(middleware_1.default.unknownEndPointHandler);
app.use(middleware_1.default.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map