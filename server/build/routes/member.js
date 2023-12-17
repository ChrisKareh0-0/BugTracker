"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var member_1 = require("../controllers/member");
var middleware_1 = __importDefault(require("../middleware"));
var router = express_1.default.Router();
var auth = middleware_1.default.auth;
router.post('/:projectId/members', auth, member_1.addProjectMembers);
router.delete('/:projectId/members/:memberId', auth, member_1.removeProjectMember);
router.post('/:projectId/members/leave', auth, member_1.leaveProjectAsMember);
exports.default = router;
//# sourceMappingURL=member.js.map