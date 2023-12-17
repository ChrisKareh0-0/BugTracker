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
exports.Note = void 0;
var typeorm_1 = require("typeorm");
var Bug_1 = require("./Bug");
var User_1 = require("./User");
var Note = /** @class */ (function (_super) {
    __extends(Note, _super);
    function Note() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Note.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Note.prototype, "body", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user; }),
        typeorm_1.JoinColumn({ name: 'authorId' }),
        __metadata("design:type", User_1.User)
    ], Note.prototype, "author", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Note.prototype, "authorId", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Bug_1.Bug; }, function (bug) { return bug; }),
        typeorm_1.JoinColumn({ name: 'bugId' }),
        __metadata("design:type", Bug_1.Bug)
    ], Note.prototype, "bug", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Note.prototype, "bugId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Note.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Note.prototype, "updatedAt", void 0);
    Note = __decorate([
        typeorm_1.Entity({ name: 'notes' })
    ], Note);
    return Note;
}(typeorm_1.BaseEntity));
exports.Note = Note;
//# sourceMappingURL=Note.js.map