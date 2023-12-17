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
exports.leaveProjectAsMember = exports.removeProjectMember = exports.addProjectMembers = void 0;
var Project_1 = require("../entity/Project");
var Member_1 = require("../entity/Member");
var validators_1 = require("../utils/validators");
var addProjectMembers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var memberIds, projectId, targetProject, currentMembers, membersValidationError, membersArray, updatedMembers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                memberIds = req.body.members;
                projectId = req.params.projectId;
                if (memberIds.length === 0) {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ message: 'Members field must not be an empty array.' })];
                }
                return [4 /*yield*/, Project_1.Project.findOne({
                        where: { id: projectId },
                        relations: ['members'],
                    })];
            case 1:
                targetProject = _a.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                if (targetProject.createdById !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                currentMembers = targetProject.members.map(function (m) { return m.memberId; });
                membersValidationError = validators_1.projectMembersError(__spreadArrays(currentMembers, memberIds));
                if (membersValidationError) {
                    return [2 /*return*/, res.status(400).send({ message: membersValidationError })];
                }
                membersArray = memberIds.map(function (memberId) { return ({
                    memberId: memberId,
                    projectId: projectId,
                }); });
                return [4 /*yield*/, Member_1.Member.insert(membersArray)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Member_1.Member.createQueryBuilder('projectMember')
                        .leftJoinAndSelect('projectMember.member', 'member')
                        .where('projectMember.projectId = :projectId', { projectId: projectId })
                        .select([
                        'projectMember.id',
                        'projectMember.joinedAt',
                        'member.id',
                        'member.username',
                    ])
                        .getMany()];
            case 3:
                updatedMembers = _a.sent();
                res.status(201).json(updatedMembers);
                return [2 /*return*/];
        }
    });
}); };
exports.addProjectMembers = addProjectMembers;
var removeProjectMember = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectId, memberId, targetProject;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, projectId = _a.projectId, memberId = _a.memberId;
                return [4 /*yield*/, Project_1.Project.findOne({
                        where: { id: projectId },
                        relations: ['members'],
                    })];
            case 1:
                targetProject = _b.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                if (targetProject.createdById !== req.user) {
                    return [2 /*return*/, res.status(401).send({ message: 'Access is denied.' })];
                }
                if (targetProject.createdById === memberId) {
                    return [2 /*return*/, res
                            .status(400)
                            .send({ message: "Project creator can't be removed." })];
                }
                if (!targetProject.members.map(function (m) { return m.memberId; }).includes(memberId)) {
                    return [2 /*return*/, res.status(404).send({
                            message: "Member isn't part of the project or already removed.",
                        })];
                }
                return [4 /*yield*/, Member_1.Member.delete({ projectId: projectId, memberId: memberId })];
            case 2:
                _b.sent();
                res.status(204).end();
                return [2 /*return*/];
        }
    });
}); };
exports.removeProjectMember = removeProjectMember;
var leaveProjectAsMember = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, targetProject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = req.params.projectId;
                return [4 /*yield*/, Project_1.Project.findOne({
                        where: { id: projectId },
                        relations: ['members'],
                    })];
            case 1:
                targetProject = _a.sent();
                if (!targetProject) {
                    return [2 /*return*/, res.status(404).send({ message: 'Invalid project ID.' })];
                }
                if (targetProject.createdById === req.user) {
                    return [2 /*return*/, res.status(400).send({ message: "Project creator can't leave." })];
                }
                if (!targetProject.members.map(function (m) { return m.memberId; }).includes(req.user)) {
                    return [2 /*return*/, res.status(404).send({
                            message: "You're not a member of the project.",
                        })];
                }
                return [4 /*yield*/, Member_1.Member.delete({ projectId: projectId, memberId: req.user })];
            case 2:
                _a.sent();
                res.status(204).end();
                return [2 /*return*/];
        }
    });
}); };
exports.leaveProjectAsMember = leaveProjectAsMember;
//# sourceMappingURL=member.js.map