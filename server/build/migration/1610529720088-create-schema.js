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
exports.createSchema1610529720088 = void 0;
var createSchema1610529720088 = /** @class */ (function () {
    function createSchema1610529720088() {
        this.name = 'createSchema1610529720088';
    }
    createSchema1610529720088.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"users\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"username\" character varying(20) NOT NULL, \"passwordHash\" character varying NOT NULL, CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"members\" (\"id\" SERIAL NOT NULL, \"projectId\" uuid NOT NULL, \"memberId\" uuid NOT NULL, \"joinedAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_28b53062261b996d9c99fa12404\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"projects\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"name\" character varying(60) NOT NULL, \"createdById\" uuid NOT NULL, CONSTRAINT \"PK_6271df0a7aed1d6c0691ce6ac50\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"notes\" (\"id\" SERIAL NOT NULL, \"body\" character varying NOT NULL, \"authorId\" uuid NOT NULL, \"bugId\" uuid NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_af6206538ea96c4e77e9f400c3d\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TYPE \"bugs_priority_enum\" AS ENUM('low', 'medium', 'high')")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"bugs\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"title\" character varying(60) NOT NULL, \"description\" character varying NOT NULL, \"priority\" \"bugs_priority_enum\" NOT NULL DEFAULT 'low', \"projectId\" uuid NOT NULL, \"isResolved\" boolean NOT NULL DEFAULT false, \"closedById\" uuid, \"closedAt\" TIMESTAMP, \"reopenedById\" uuid, \"reopenedAt\" TIMESTAMP, \"createdById\" uuid NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedById\" uuid, \"updatedAt\" TIMESTAMP, CONSTRAINT \"PK_dadac7f01b703d50496ae1d3e74\" PRIMARY KEY (\"id\"))")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"members\" ADD CONSTRAINT \"FK_da3e8adedb86281bf9203b1b0ec\" FOREIGN KEY (\"projectId\") REFERENCES \"projects\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"members\" ADD CONSTRAINT \"FK_b8b1af4785a6d102a8704912178\" FOREIGN KEY (\"memberId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"projects\" ADD CONSTRAINT \"FK_f55144dc92df43cd1dad5d29b90\" FOREIGN KEY (\"createdById\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"notes\" ADD CONSTRAINT \"FK_d358080cb403fe88e62cc9cba58\" FOREIGN KEY (\"authorId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"notes\" ADD CONSTRAINT \"FK_80e0afbc05b34045e45ad183775\" FOREIGN KEY (\"bugId\") REFERENCES \"bugs\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" ADD CONSTRAINT \"FK_b2b8219ad96da5bb8df99c8ea39\" FOREIGN KEY (\"projectId\") REFERENCES \"projects\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" ADD CONSTRAINT \"FK_5748f0f4995f9530bf174a068af\" FOREIGN KEY (\"closedById\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" ADD CONSTRAINT \"FK_2e4e579ff84e2e8ee880be824d4\" FOREIGN KEY (\"reopenedById\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" ADD CONSTRAINT \"FK_953bc502117c756d7268995b358\" FOREIGN KEY (\"createdById\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" ADD CONSTRAINT \"FK_df9f856721165a7d9e57705fb26\" FOREIGN KEY (\"updatedById\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 16:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    createSchema1610529720088.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" DROP CONSTRAINT \"FK_df9f856721165a7d9e57705fb26\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" DROP CONSTRAINT \"FK_953bc502117c756d7268995b358\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" DROP CONSTRAINT \"FK_2e4e579ff84e2e8ee880be824d4\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" DROP CONSTRAINT \"FK_5748f0f4995f9530bf174a068af\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"bugs\" DROP CONSTRAINT \"FK_b2b8219ad96da5bb8df99c8ea39\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"notes\" DROP CONSTRAINT \"FK_80e0afbc05b34045e45ad183775\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"notes\" DROP CONSTRAINT \"FK_d358080cb403fe88e62cc9cba58\"")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"projects\" DROP CONSTRAINT \"FK_f55144dc92df43cd1dad5d29b90\"")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"members\" DROP CONSTRAINT \"FK_b8b1af4785a6d102a8704912178\"")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"members\" DROP CONSTRAINT \"FK_da3e8adedb86281bf9203b1b0ec\"")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"bugs\"")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TYPE \"bugs_priority_enum\"")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"notes\"")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"projects\"")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"members\"")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"users\"")];
                    case 16:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return createSchema1610529720088;
}());
exports.createSchema1610529720088 = createSchema1610529720088;
//# sourceMappingURL=1610529720088-create-schema.js.map