"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.userRegistrationValidation = void 0;
var joi_1 = __importDefault(require("@hapi/joi"));
/**
 * registration input details validation
 *
 */
var userRegistrationValidation = function (data) {
    //schema for validation
    var schema = joi_1.default.object({
        name: joi_1.default.string()
            .required(),
        email: joi_1.default.string()
            .required()
            .email(),
        password: joi_1.default.string()
            .min(6)
            .required(),
        admin: joi_1.default.boolean()
    });
    return schema.validate(data);
};
exports.userRegistrationValidation = userRegistrationValidation;
/**
 * login input details validation
 * @param {object} data
 */
var loginValidation = function (data) {
    //schema for validation
    var schema = joi_1.default.object({
        name: joi_1.default.string()
            .required(),
        email: joi_1.default.string()
            .required()
            .email(),
        password: joi_1.default.string()
            .min(6)
            .required(),
        admin: joi_1.default.boolean(),
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
