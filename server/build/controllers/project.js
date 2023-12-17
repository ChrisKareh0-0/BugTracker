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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.editProjectName = exports.createProject = exports.getProjects = void 0;
var Project_1 = require("../entity/Project");
var Member_1 = require("../entity/Member");
var Bug_1 = require("../entity/Bug");
var validators_1 = require("../utils/validators");
var fieldsToSelect = [
    'project.id',
    'project.name',
    'project.createdAt',
    'project.updatedAt',
    'createdBy.id',
    'createdBy.username',
    'members.id',
    'members.joinedAt',
    'member.id',
    'member.username',
    'bug.id',
];
var getProjects = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projects;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Project_1.Project.createQueryBuilder('project')
                    .leftJoin('project.members', 'projectMember')
                    .where('projectMember.memberId = :userId', { userId: req.user })
                    .leftJoinAndSelect('project.members', 'members')
                    .leftJoinAndSelect('project.createdBy', 'createdBy')
                    .leftJoinAndSelect('members.member', 'member')
                    .leftJoinAndSelect('project.bugs', 'bug')
                    .select(fieldsToSelect)
                    .getMany()];
            case 1:
                projects = _a.sent();
                res.json(projects);
                return [2 /*return*/];
        }
    });
}); };
exports.getProjects = getProjects;
var createProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, memberIds, _a, errors, valid, newProject, membersArray, relationedProject;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                name = req.body.name;
                memberIds = req.body.members
                    ? __spreadArrays([req.user], req.body.members)
                    : [req.user];
                _a = validators_1.createProjectValidator(name, memberIds), errors = _a.errors, valid = _a.valid;
                if (!valid) {
                    return [2 /*return*/, res.status(400).send({ message: Object.values(errors)[0] })];
                }
                newProject = Project_1.Project.create({
                    name: name,
                    createdById: req.user,
                });
                return [4 /*yield*/, newProject.save()];
            case 1:
                _b.sent();
                membersArray = memberIds.map(function (memberId) { return ({
                    memberId: memberId,
                    projectId: newProject.id,
                }); });
                return [4 /*yield*/, Member_1.Member.insert(membersArray)];
            case 2:
                _b.sent();
                return [4 /*yield*/, Project_1.Project.createQueryBuilder('project')
                        .where('project.id = :projectId', { projectId: newProject.id })
                        .leftJoinAndSelect('project.members', 'members')
                        .leftJoinAndSelect('project.createdBy', 'createdBy')
                        .leftJoinAndSelect('members.member', 'member')
                        .leftJoinAndSelect('project.bugs', 'bug')
                        .select(fieldsToSelect)
                        .getOne()];
            case 3:
                relationedProject = _b.sent();
                res.status(201).json(relationedProject);
                return [2 /*return*/];
        }
    });
}); };
exports.createProject = createProject;
var editProjectName = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, projectId, nameValidationError, targetProject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                projectId = req.params.projectId;
                nameValidationError = validators_1.projectNameError(name);
                if (nameValidationError) {
                    return [2 /*return*/, res.status(400).send({ message: nameValidationError })];
                }
                return [4 /*yield*/, Project_1.Project.findOne({ id: projectId })];
            case 1:
                targetProject = _a.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                if (targetProject.createdById !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                targetProject.name = name;
                return [4 /*yield*/, targetProject.save()];
            case 2:
                _a.sent();
                res.json(targetProject);
                return [2 /*return*/];
        }
    });
}); };
exports.editProjectName = editProjectName;
var deleteProject = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, targetProject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                return [4 /*yield*/, Project_1.Project.findOne({ id: projectId })];
            case 1:
                targetProject = _a.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                if (targetProject.createdById !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                return [4 /*yield*/, Member_1.Member.delete({ projectId: projectId })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Bug_1.Bug.delete({ projectId: projectId })];
            case 3:
                _a.sent();
                return [4 /*yield*/, targetProject.remove()];
            case 4:
                _a.sent();
                res.status(204).end();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.js.map