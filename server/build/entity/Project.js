"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
var typeorm_1 = require("typeorm");
var BaseModel_1 = __importDefault(require("./BaseModel"));
var User_1 = require("./User");
var Member_1 = require("./Member");
var Bug_1 = require("./Bug");
var Project = /** @class */ (function (_super) {
    __extends(Project, _super);
    function Project() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 60 }),
        __metadata("design:type", String)
    ], Project.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'createdById' }),
        __metadata("design:type", User_1.User)
    ], Project.prototype, "createdBy", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Project.prototype, "createdById", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Member_1.Member; }, function (member) { return member.project; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Array)
    ], Project.prototype, "members", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Bug_1.Bug; }, function (bugs) { return bugs.project; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Array)
    ], Project.prototype, "bugs", void 0);
    Project = __decorate([
        typeorm_1.Entity({ name: 'projects' })
    ], Project);
    return Project;
}(BaseModel_1.default));
exports.Project = Project;
//# sourceMappingURL=Project.js.map