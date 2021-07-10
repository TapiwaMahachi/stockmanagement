"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.all = exports.signup = exports.login = void 0;
var user_js_1 = __importDefault(require("../models/user.js"));
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//handle create user on POST
var signup = [
    //validate and sanitize input 
    express_validator_1.body('name', 'Invalid name').trim().isLength({ min: 2 }).escape(),
    express_validator_1.body('email', 'Invalid email').isEmail().normalizeEmail(),
    express_validator_1.body('password', 'Invalid password').isLength({ min: 6 }),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, userExist, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty())
                        res.status(401).send({ errors: errors.array() });
                    return [4 /*yield*/, user_js_1.default.findOne({ email: req.body.email })];
                case 1:
                    userExist = _a.sent();
                    if (userExist)
                        return [2 /*return*/, next(new Error('User already exists'))];
                    user = new user_js_1.default(req.body);
                    user.save()
                        .then(function (user) { return res.status(201).send(user); })
                        .catch(function (err) { return res.status(400).json(err); });
                    return [2 /*return*/];
            }
        });
    }); }
];
exports.signup = signup;
//handle user login on POST
var login = [
    //validate and sanitize input 
    express_validator_1.body('name', 'Invalid name').trim().isLength({ min: 2 }).escape(),
    express_validator_1.body('email', 'Invalid email').isEmail().normalizeEmail(),
    express_validator_1.body('password', 'Invalid password').isLength({ min: 6 }),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!errors.isEmpty()) {
                        res.status(401).send({ errors: errors.array() });
                    }
                    return [4 /*yield*/, user_js_1.default.findOne({ email: req.body.email })];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/, next(new Error('User does not exist'))];
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch) {
                            var token = jsonwebtoken_1.default.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
                            res.json({ token: token });
                        }
                        else {
                            return next(new Error('bad credentials'));
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); }
];
exports.login = login;
//get all users
var all = function (req, res, next) {
    user_js_1.default.find({}, function (err, user) {
        if (err)
            return next(err);
        res.json(user);
    });
};
exports.all = all;
//delete user
var deleteUser = function (req, res, next) {
    user_js_1.default.deleteOne({ id: req.params.id }, function (err) {
        if (err)
            return next(err);
        res.status(201).send('user deleted');
    });
};
exports.deleteUser = deleteUser;
//update User
var updateUser = [
    //validate and sanitize
    express_validator_1.body('name', "Invalid name").isLength({ min: 2 }).escape().trim(),
    express_validator_1.body('email', "Invalid email").isEmail().normalizeEmail(),
    express_validator_1.body('password', 'Invalid password').isLength({ min: 6 }),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, oldUser, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = express_validator_1.validationResult(req.body);
                    if (!errors.isEmpty())
                        return [2 /*return*/, next(new Error({ error: errors.array() }))];
                    return [4 /*yield*/, user_js_1.default.findById({ _id: req.params.id })];
                case 1:
                    oldUser = _a.sent();
                    newUser = new user_js_1.default(__assign(__assign(__assign({}, oldUser), req.body), { _id: req.params.id }));
                    newUser.save()
                        .then(function (user) { return res.json(user); })
                        .catch(function (err) {
                        return next(new Error('Failed to update user'));
                    });
                    return [2 /*return*/];
            }
        });
    }); }
];
exports.updateUser = updateUser;
