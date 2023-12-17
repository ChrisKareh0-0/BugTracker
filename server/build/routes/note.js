"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var note_1 = require("../controllers/note");
var middleware_1 = __importDefault(require("../middleware"));
var router = express_1.default.Router();
var auth = middleware_1.default.auth;
router.post('/:projectId/bugs/:bugId/notes', auth, note_1.postNote);
router.delete('/:projectId/notes/:noteId', auth, note_1.deleteNote);
router.put('/:projectId/notes/:noteId', auth, note_1.updateNote);
exports.default = router;
//# sourceMappingURL=note.js.map