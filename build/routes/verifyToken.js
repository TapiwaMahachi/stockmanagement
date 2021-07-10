"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//middleware to veryfy users
function verifyUser(req, res, next) {
    /**
     * token stored in the cookie object
     */
    var token = req.cookies.jwt;
    if (!token) {
        var err_1 = new Error('Accecc-Denied');
        err_1.status = 401;
        return next(err_1);
    }
    try {
        var verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        //creating a property user assinged the verified user.
        req.user = verified;
        //verifying if the user is admin
        var admin = req.user.admin;
        if (!admin) {
            var err_2 = new Error('User is not admin');
            err_2.status = 403;
            return next(err_2);
        }
        next();
    }
    catch (err) {
        var err = new Error('Invalid-token');
        err.status = 401;
        return next(err);
    }
}
exports.default = verifyUser;
