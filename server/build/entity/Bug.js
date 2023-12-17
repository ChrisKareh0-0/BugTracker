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
exports.Bug = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./Project");
var User_1 = require("./User");
var Note_1 = require("./Note");
var Bug = /** @class */ (function (_super) {
    __extends(Bug, _super);
    function Bug() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Bug.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 60 }),
        __metadata("design:type", String)
    ], Bug.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bug.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: ['low', 'medium', 'high'],
            default: 'low',
        }),
        __metadata("design:type", String)
    ], Bug.prototype, "priority", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Project_1.Project; }, function (project) { return project; }),
        typeorm_1.JoinColumn({ name: 'projectId' }),
        __metadata("design:type", Project_1.Project)
    ], Bug.prototype, "project", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bug.prototype, "projectId", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Note_1.Note; }, function (note) { return note.bug; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Array)
    ], Bug.prototype, "notes", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], Bug.prototype, "isResolved", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'closedById' }),
        __metadata("design:type", User_1.User)
    ], Bug.prototype, "closedBy", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", Object)
    ], Bug.prototype, "closedById", void 0);
    __decorate([
        typeorm_1.Column({ type: 'timestamp', nullable: true }),
        __metadata("design:type", Object)
    ], Bug.prototype, "closedAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'reopenedById' }),
        __metadata("design:type", User_1.User)
    ], Bug.prototype, "reopenedBy", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", Object)
    ], Bug.prototype, "reopenedById", void 0);
    __decorate([
        typeorm_1.Column({ type: 'timestamp', nullable: true }),
        __metadata("design:type", Object)
    ], Bug.prototype, "reopenedAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'createdById' }),
        __metadata("design:type", User_1.User)
    ], Bug.prototype, "createdBy", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bug.prototype, "createdById", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Bug.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'updatedById' }),
        __metadata("design:type", User_1.User)
    ], Bug.prototype, "updatedBy", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Bug.prototype, "updatedById", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], Bug.prototype, "updatedAt", void 0);
    Bug = __decorate([
        typeorm_1.Entity({ name: 'bugs' })
    ], Bug);
    return Bug;
}(typeorm_1.BaseEntity));
exports.Bug = Bug;
//# sourceMappingURL=Bug.js.map