"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = __importDefault(require("express"));
var users_js_1 = require("../../../controller/users.js");
var router = express_1.default.Router();
exports.userRoutes = router;
/*------------Public routes ------------*/
router.post('/signup', users_js_1.signup);
router.post('/login', users_js_1.login);
/*------------Private Routes -----------*/
router.get('/all', users_js_1.all);
router.post('/update/user/:id/', users_js_1.updateUser);
