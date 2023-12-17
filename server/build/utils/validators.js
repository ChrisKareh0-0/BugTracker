"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBugValidator = exports.createProjectValidator = exports.projectMembersError = exports.projectNameError = exports.loginValidator = exports.registerValidator = void 0;
var registerValidator = function (username, password) {
    var errors = {};
    if (!username ||
        username.trim() === '' ||
        username.length > 20 ||
        username.length < 3) {
        errors.username = 'Username must be in range of 3-20 characters length.';
    }
    if (!/^[a-zA-Z0-9-_]*$/.test(username)) {
        errors.username = 'Username must have alphanumeric characters only.';
    }
    if (!password || password.length < 6) {
        errors.password = 'Password must be atleast 6 characters long.';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.registerValidator = registerValidator;
var loginValidator = function (username, password) {
    var errors = {};
    if (!username || username.trim() === '') {
        errors.username = 'Username field must not be empty.';
    }
    if (!password) {
        errors.password = 'Password field must not be empty.';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.loginValidator = loginValidator;
var projectNameError = function (name) {
    if (!name || name.trim() === '' || name.length > 60) {
        return 'Project name length must not be more than 60.';
    }
};
exports.projectNameError = projectNameError;
var projectMembersError = function (members) {
    if (!Array.isArray(members)) {
        return 'Members field must be an array.';
    }
    if (members.filter(function (m, i) { return members.indexOf(m) !== i; }).length !== 0) {
        return 'Members field must not have already-added/duplicate IDs.';
    }
    if (members.some(function (m) { return m.length !== 36; })) {
        return 'Members array must contain valid UUIDs.';
    }
};
exports.projectMembersError = projectMembersError;
var createProjectValidator = function (name, members) {
    var errors = {};
    var nameError = exports.projectNameError(name);
    var membersError = exports.projectMembersError(members);
    if (nameError) {
        errors.name = nameError;
    }
    if (membersError) {
        errors.members = membersError;
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.createProjectValidator = createProjectValidator;
var createBugValidator = function (title, description, priority) {
    var errors = {};
    var validPriorities = ['low', 'medium', 'high'];
    if (!title || title.trim() === '' || title.length > 60 || title.length < 3) {
        errors.title = 'Title must be in range of 3-60 characters length.';
    }
    if (!description || description.trim() === '') {
        errors.description = 'Description field must not be empty.';
    }
    if (!priority || !validPriorities.includes(priority)) {
        errors.priority = 'Priority can only be - low, medium or high.';
    }
    return {
        errors: errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.createBugValidator = createBugValidator;
//# sourceMappingURL=validators.js.map