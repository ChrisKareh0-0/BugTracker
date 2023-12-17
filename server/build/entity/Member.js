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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./Project");
var User_1 = require("./User");
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Member.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Project_1.Project; }, function (project) { return project; }),
        typeorm_1.JoinColumn({ name: 'projectId' }),
        __metadata("design:type", Project_1.Project)
    ], Member.prototype, "project", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Member.prototype, "projectId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'memberId' }),
        __metadata("design:type", User_1.User)
    ], Member.prototype, "member", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Member.prototype, "memberId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Member.prototype, "joinedAt", void 0);
    Member = __decorate([
        typeorm_1.Entity({ name: 'members' })
    ], Member);
    return Member;
}(typeorm_1.BaseEntity));
exports.Member = Member;
//# sourceMappingURL=Member.js.map