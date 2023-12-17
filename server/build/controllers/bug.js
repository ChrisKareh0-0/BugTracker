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
exports.reopenBug = exports.closeBug = exports.deleteBug = exports.updateBug = exports.createBug = exports.getBugs = void 0;
var Member_1 = require("../entity/Member");
var Bug_1 = require("../entity/Bug");
var Note_1 = require("../entity/Note");
var Project_1 = require("../entity/Project");
var validators_1 = require("../utils/validators");
var fieldsToSelect = [
    'bug.id',
    'bug.projectId',
    'bug.title',
    'bug.description',
    'bug.priority',
    'bug.isResolved',
    'bug.createdAt',
    'bug.updatedAt',
    'bug.closedAt',
    'bug.reopenedAt',
    'createdBy.id',
    'createdBy.username',
    'updatedBy.id',
    'updatedBy.username',
    'closedBy.id',
    'closedBy.username',
    'reopenedBy.id',
    'reopenedBy.username',
    'note.id',
    'note.bugId',
    'note.body',
    'note.createdAt',
    'note.updatedAt',
    'noteAuthor.id',
    'noteAuthor.username',
];
var getBugs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, projectMembers, bugs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _a.sent();
                if (!projectMembers.map(function (m) { return m.memberId; }).includes(req.user)) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, Bug_1.Bug.createQueryBuilder('bug')
                        .where('"projectId" = :projectId', { projectId: projectId })
                        .leftJoinAndSelect('bug.createdBy', 'createdBy')
                        .leftJoinAndSelect('bug.updatedBy', 'updatedBy')
                        .leftJoinAndSelect('bug.closedBy', 'closedBy')
                        .leftJoinAndSelect('bug.reopenedBy', 'reopenedBy')
                        .leftJoinAndSelect('bug.notes', 'note')
                        .leftJoinAndSelect('note.author', 'noteAuthor')
                        .select(fieldsToSelect)
                        .getMany()];
            case 2:
                bugs = _a.sent();
                res.json(bugs);
                return [2 /*return*/];
        }
    });
}); };
exports.getBugs = getBugs;
var createBug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, priority, projectId, _b, errors, valid, projectMembers, memberIds, newBug, relationedBug;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, priority = _a.priority;
                projectId = req.params.projectId;
                _b = validators_1.createBugValidator(title, description, priority), errors = _b.errors, valid = _b.valid;
                if (!valid) {
                    return [2 /*return*/, res.status(400).send({ message: Object.values(errors)[0] })];
                }
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _c.sent();
                memberIds = projectMembers.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                newBug = Bug_1.Bug.create({
                    title: title,
                    description: description,
                    priority: priority,
                    projectId: projectId,
                    createdById: req.user,
                });
                return [4 /*yield*/, newBug.save()];
            case 2:
                _c.sent();
                return [4 /*yield*/, Bug_1.Bug.createQueryBuilder('bug')
                        .where('bug.id = :bugId', { bugId: newBug.id })
                        .leftJoinAndSelect('bug.createdBy', 'createdBy')
                        .leftJoinAndSelect('bug.updatedBy', 'updatedBy')
                        .leftJoinAndSelect('bug.closedBy', 'closedBy')
                        .leftJoinAndSelect('bug.reopenedBy', 'reopenedBy')
                        .leftJoinAndSelect('bug.notes', 'note')
                        .leftJoinAndSelect('note.author', 'noteAuthor')
                        .select(fieldsToSelect)
                        .getOne()];
            case 3:
                relationedBug = _c.sent();
                return [2 /*return*/, res.status(201).json(relationedBug)];
        }
    });
}); };
exports.createBug = createBug;
var updateBug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, priority, _b, projectId, bugId, _c, errors, valid, projectMembers, memberIds, targetBug, relationedBug;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, title = _a.title, description = _a.description, priority = _a.priority;
                _b = req.params, projectId = _b.projectId, bugId = _b.bugId;
                _c = validators_1.createBugValidator(title, description, priority), errors = _c.errors, valid = _c.valid;
                if (!valid) {
                    return [2 /*return*/, res.status(400).send({ message: Object.values(errors)[0] })];
                }
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _d.sent();
                memberIds = projectMembers.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, Bug_1.Bug.findOne({ id: bugId })];
            case 2:
                targetBug = _d.sent();
                if (!targetBug) {
                    return [2 /*return*/, res.status(400).send({ message: 'Invalid bug ID.' })];
                }
                targetBug.title = title;
                targetBug.description = description;
                targetBug.priority = priority;
                targetBug.updatedById = req.user;
                targetBug.updatedAt = new Date();
                return [4 /*yield*/, targetBug.save()];
            case 3:
                _d.sent();
                return [4 /*yield*/, Bug_1.Bug.createQueryBuilder('bug')
                        .where('bug.id = :bugId', { bugId: bugId })
                        .leftJoinAndSelect('bug.createdBy', 'createdBy')
                        .leftJoinAndSelect('bug.updatedBy', 'updatedBy')
                        .leftJoinAndSelect('bug.closedBy', 'closedBy')
                        .leftJoinAndSelect('bug.reopenedBy', 'reopenedBy')
                        .leftJoinAndSelect('bug.notes', 'note')
                        .leftJoinAndSelect('note.author', 'noteAuthor')
                        .select(fieldsToSelect)
                        .getOne()];
            case 4:
                relationedBug = _d.sent();
                return [2 /*return*/, res.status(201).json(relationedBug)];
        }
    });
}); };
exports.updateBug = updateBug;
var deleteBug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, bugId, targetProject, targetBug;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, projectId = _a.projectId, bugId = _a.bugId;
                return [4 /*yield*/, Project_1.Project.findOne({
                        id: projectId,
                    })];
            case 1:
                targetProject = _b.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                return [4 /*yield*/, Bug_1.Bug.findOne({ id: bugId })];
            case 2:
                targetBug = _b.sent();
                if (!targetBug) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid bug ID.' })];
                }
                if (targetProject.createdById !== req.user &&
                    targetBug.createdById !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, Note_1.Note.delete({ bugId: bugId })];
            case 3:
                _b.sent();
                return [4 /*yield*/, targetBug.remove()];
            case 4:
                _b.sent();
                res.status(204).end();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteBug = deleteBug;
var closeBug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, bugId, projectMembers, memberIds, targetBug, relationedBug;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, projectId = _a.projectId, bugId = _a.bugId;
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _b.sent();
                memberIds = projectMembers.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, Bug_1.Bug.findOne({ id: bugId })];
            case 2:
                targetBug = _b.sent();
                if (!targetBug) {
                    return [2 /*return*/, res.status(400).send({ message: 'Invalid bug ID.' })];
                }
                if (targetBug.isResolved === true) {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ message: 'Bug is already marked as closed.' })];
                }
                targetBug.isResolved = true;
                targetBug.closedById = req.user;
                targetBug.closedAt = new Date();
                targetBug.reopenedById = null;
                targetBug.reopenedAt = null;
                return [4 /*yield*/, targetBug.save()];
            case 3:
                _b.sent();
                return [4 /*yield*/, Bug_1.Bug.createQueryBuilder('bug')
                        .where('bug.id = :bugId', { bugId: bugId })
                        .leftJoinAndSelect('bug.createdBy', 'createdBy')
                        .leftJoinAndSelect('bug.updatedBy', 'updatedBy')
                        .leftJoinAndSelect('bug.closedBy', 'closedBy')
                        .leftJoinAndSelect('bug.reopenedBy', 'reopenedBy')
                        .leftJoinAndSelect('bug.notes', 'note')
                        .leftJoinAndSelect('note.author', 'noteAuthor')
                        .select(fieldsToSelect)
                        .getOne()];
            case 4:
                relationedBug = _b.sent();
                return [2 /*return*/, res.status(201).json(relationedBug)];
        }
    });
}); };
exports.closeBug = closeBug;
var reopenBug = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, bugId, projectMembers, memberIds, targetBug, relationedBug;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, projectId = _a.projectId, bugId = _a.bugId;
                return [4 /*yield*/, Member_1.Member.find({ projectId: projectId })];
            case 1:
                projectMembers = _b.sent();
                memberIds = projectMembers.map(function (m) { return m.memberId; });
                if (!memberIds.includes(req.user)) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, Bug_1.Bug.findOne({ id: bugId })];
            case 2:
                targetBug = _b.sent();
                if (!targetBug) {
                    return [2 /*return*/, res.status(400).send({ message: 'Invalid bug ID.' })];
                }
                if (targetBug.isResolved === false) {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ message: 'Bug is already marked as opened.' })];
                }
                targetBug.isResolved = false;
                targetBug.reopenedById = req.user;
                targetBug.reopenedAt = new Date();
                targetBug.closedById = null;
                targetBug.closedAt = null;
                return [4 /*yield*/, targetBug.save()];
            case 3:
                _b.sent();
                return [4 /*yield*/, Bug_1.Bug.createQueryBuilder('bug')
                        .where('bug.id = :bugId', { bugId: bugId })
                        .leftJoinAndSelect('bug.createdBy', 'createdBy')
                        .leftJoinAndSelect('bug.updatedBy', 'updatedBy')
                        .leftJoinAndSelect('bug.closedBy', 'closedBy')
                        .leftJoinAndSelect('bug.reopenedBy', 'reopenedBy')
                        .leftJoinAndSelect('bug.notes', 'note')
                        .leftJoinAndSelect('note.author', 'noteAuthor')
                        .select(fieldsToSelect)
                        .getOne()];
            case 4:
                relationedBug = _b.sent();
                return [2 /*return*/, res.status(201).json(relationedBug)];
        }
    });
}); };
exports.reopenBug = reopenBug;
//# sourceMappingURL=bug.js.map