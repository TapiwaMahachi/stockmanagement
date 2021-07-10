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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_supplier = exports.create_supplier = exports.all_suppliers = void 0;
var express_validator_1 = require("express-validator");
var supplier_js_1 = __importDefault(require("../models/supplier.js"));
var product_js_1 = __importDefault(require("../models/product.js"));
//handle supplier get 
var all_suppliers = function (req, res, next) {
    supplier_js_1.default.find({}, function (err, data) {
        if (err)
            return next(err);
        res.status(201).send(data);
    });
};
exports.all_suppliers = all_suppliers;
//handle supplier create on POST
var create_supplier = [
    //validate and sanitize the results
    express_validator_1.body('name', 'Enter valid supplier name').trim().isLength({ min: 1 }).escape(),
    express_validator_1.body('email', 'Invalid Email').isEmail().normalizeEmail(),
    function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, supplier, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = express_validator_1.validationResult(req);
                    if (!!errors.isEmpty()) return [3 /*break*/, 1];
                    res.status(401).send({ errors: errors.array() });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, supplier_js_1.default.findOne({ email: req.body.email })];
                case 2:
                    supplier = _a.sent();
                    if (supplier) {
                        err = new Error('Supplier Already Exists');
                        return [2 /*return*/, next(err)];
                    }
                    supplier_js_1.default.create(req.body, function (err, data) {
                        if (err)
                            return next(err);
                        res.status(201).send(data);
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }
];
exports.create_supplier = create_supplier;
//associating our suplier to the product
var add_supplier = function (req, res, next) {
    product_js_1.default.findById({ _id: req.params.id }, function (err, product) {
        if (err)
            return next(err);
        product.supplier.push(req.body.supplier);
        console.log("Supplier from the body " + req.body);
        product.save(function (err) {
            if (err)
                return next(err);
            res.status(201).send('sucesss');
        });
    });
};
exports.add_supplier = add_supplier;
