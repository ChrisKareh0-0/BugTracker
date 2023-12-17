"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.deleteNote = exports.postNote = void 0;
var Member_1 = require("../entity/Member");
var Note_1 = require("../entity/Note");
var Project_1 = require("../entity/Project");
var postNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, projectId, bugId, projectMembers, memberIds, newNote, relationedNote;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body.body;
                _a = req.params, projectId = _a.projectId, bugId = _a.bugId;
                if (!body || body.trim() === '') {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ message: 'Note body field must not be empty.' })];
                }
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _b.sent();
                memberIds = projectMembers.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res
                            .status(401)
                            .send({ message: 'Access is denied. Not a member of the project.' })];
                }
                newNote = Note_1.Note.create({ body: body, authorId: req.user, bugId: bugId });
                return [4 /*yield*/, newNote.save()];
            case 2:
                _b.sent();
                return [4 /*yield*/, Note_1.Note.createQueryBuilder('note')
                        .where('note.id = :noteId', { noteId: newNote.id })
                        .leftJoinAndSelect('note.author', 'author')
                        .select([
                        'note.id',
                        'note.bugId',
                        'note.body',
                        'note.createdAt',
                        'note.updatedAt',
                        'author.id',
                        'author.username',
                    ])
                        .getOne()];
            case 3:
                relationedNote = _b.sent();
                res.status(201).json(relationedNote);
                return [2 /*return*/];
        }
    });
}); };
exports.postNote = postNote;
var deleteNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, noteId, targetProject, memberIds, targetNote;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, projectId = _a.projectId, noteId = _a.noteId;
                return [4 /*yield*/, Project_1.Project.findOne({
                        where: { id: projectId },
                        relations: ['members'],
                    })];
            case 1:
                targetProject = _b.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                memberIds = targetProject.members.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res
                            .status(401)
                            .send({ message: 'Access is denied. Not a member of the project.' })];
                }
                return [4 /*yield*/, Note_1.Note.findOne({ id: Number(noteId) })];
            case 2:
                targetNote = _b.sent();
                if (!targetNote) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid note ID.' })];
                }
                if (targetNote.authorId !== req.user &&
                    targetProject.createdById !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, targetNote.remove()];
            case 3:
                _b.sent();
                res.status(204).end();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteNote = deleteNote;
var updateNote = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, _a, projectId, noteId, projectMembers, memberIds, targetNote;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = req.body.body;
                _a = req.params, projectId = _a.projectId, noteId = _a.noteId;
                if (!body || body.trim() === '') {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ message: 'Note body field must not be empty.' })];
                }
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _b.sent();
                memberIds = projectMembers.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res
                            .status(401)
                            .send({ message: 'Access is denied. Not a member of the project.' })];
                }
                return [4 /*yield*/, Note_1.Note.findOne({ id: Number(noteId) })];
            case 2:
                targetNote = _b.sent();
                if (!targetNote) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid note ID.' })];
                }
                if (targetNote.authorId !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                targetNote.body = body;
                return [4 /*yield*/, targetNote.save()];
            case 3:
                _b.sent();
                res.json(targetNote);
                return [2 /*return*/];
        }
    });
}); };
exports.updateNote = updateNote;
//# sourceMappingURL=note.js.map