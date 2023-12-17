"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var project_1 = require("../controllers/project");
var middleware_1 = __importDefault(require("../middleware"));
var router = express_1.default.Router();
var auth = middleware_1.default.auth;
router.get('/', auth, project_1.getProjects);
router.post('/', auth, project_1.createProject);
router.put('/:projectId', auth, project_1.editProjectName);
router.delete('/:projectId', auth, project_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.js.map