"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bug_1 = require("../controllers/bug");
var middleware_1 = __importDefault(require("../middleware"));
var router = express_1.default.Router();
var auth = middleware_1.default.auth;
router.get('/:projectId/bugs', auth, bug_1.getBugs);
router.post('/:projectId/bugs', auth, bug_1.createBug);
router.put('/:projectId/bugs/:bugId', auth, bug_1.updateBug);
router.delete('/:projectId/bugs/:bugId', auth, bug_1.deleteBug);
router.post('/:projectId/bugs/:bugId/close', auth, bug_1.closeBug);
router.post('/:projectId/bugs/:bugId/reopen', auth, bug_1.reopenBug);
exports.default = router;
//# sourceMappingURL=bug.js.map