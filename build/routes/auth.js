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
exports.authRoute = void 0;
var express_1 = __importDefault(require("express"));
var user_js_1 = __importDefault(require("../../../models/user.js"));
var validation_js_1 = require("../../../validation.js");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyToken_js_1 = __importDefault(require("./verifyToken.js"));
var router = express_1.default.Router();
exports.authRoute = router;
//register users
router.post('/register', verifyToken_js_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error, emailExist, hashPassword, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = validation_js_1.userRegistrationValidation(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                return [4 /*yield*/, user_js_1.default.findOne({ email: req.body.email })];
            case 1:
                emailExist = _a.sent();
                if (emailExist)
                    return [2 /*return*/, res.status(400).send('Email already exists')];
                hashPassword = bcryptjs_1.default.hashSync(req.body.password, 10);
                user = __assign(__assign({}, req.body), { password: hashPassword });
                //creating a user
                user_js_1.default.create(user, function (err, user) {
                    if (err) {
                        res.status(400).send(err);
                    }
                    else {
                        //sending back the created user just the id and name only for security reasons
                        res.status(201).send({ user: user.id, name: user.name });
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
//login
//router.post('/user/login', login_user);
router.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, user, validPassword, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = validation_js_1.loginValidation(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                return [4 /*yield*/, user_js_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).send('Email or Password is wrong')];
                }
                validPassword = bcryptjs_1.default.compareSync(req.body.password, user.password);
                console.log(validPassword + ", " + user.password + ", " + req.body.password);
                if (!validPassword)
                    return [2 /*return*/, res.status(400).json("Invalid Password")];
                token = jsonwebtoken_1.default.sign({ _id: user._id, admin: user.admin }, process.env.TOKEN_SECRET, { expiresIn: 86400 });
                //adding the token to the cookies 
                //httpOnly to makes sure its only availble on the server
                res.cookie('jwt', token, { httpOnly: true });
                //sending a few user details excluding password
                res.send({ name: user.name, id: user._id, admin: user.admin });
                return [2 /*return*/];
        }
    });
}); });
//get all users
router.get('/all', verifyToken_js_1.default, function (req, res, next) {
    var admin = req.user.admin;
    if (!admin) {
        res.status(403).send('Access Denied');
    }
    //get all the Users
    user_js_1.default.find(function (err, data) {
        if (err) {
            return next(err);
        }
        else {
            res.status(201).send(data);
        }
        ;
    });
});
//get user
router.get('/user/:id', verifyToken_js_1.default, function (req, res) {
    var id = req.params.id;
    user_js_1.default.findById(id, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
});
router.put('/user/update/:id', verifyToken_js_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, id, passwordExist, hash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                admin = req.user.admin;
                if (!admin)
                    return [2 /*return*/, res.status(403).send('Not an admin')];
                id = req.params.id;
                return [4 /*yield*/, user_js_1.default.findOne({ password: req.body.password })];
            case 1:
                passwordExist = _a.sent();
                if (!passwordExist) {
                    hash = bcryptjs_1.default.hashSync(req.body.password, 10);
                    req.body.password = hash;
                }
                user_js_1.default.updateOne({ _id: id }, __assign({}, req.body), function (err, data) {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.status(201).send(data);
                });
                return [2 /*return*/];
        }
    });
}); });
router.delete('/user/delete/:id', verifyToken_js_1.default, function (req, res) {
    //verifying if the user is admin
    var admin = req.user.admin;
    if (!admin)
        return res.status(403).send('Not an admin');
    //id from the url
    var id = req.params.id;
    user_js_1.default.deleteOne({ _id: id }, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(201).send(data);
    });
});
