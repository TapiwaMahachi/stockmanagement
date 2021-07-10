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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodRoute = void 0;
var express_1 = __importDefault(require("express"));
var product_js_1 = __importDefault(require("../../../models/product.js"));
var supplier_js_1 = __importDefault(require("../../../models/supplier.js"));
var verifyToken_js_1 = __importDefault(require("./verifyToken.js"));
var router = express_1.default.Router();
exports.prodRoute = router;
//get all products
router.get('/all', function (req, res, next) {
    //verifying if the user is admin
    product_js_1.default.find({}, function (err, data) {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(data);
        }
    });
});
//get product
router.get('/product/:id', function (req, res, next) {
    product_js_1.default.findById({ _id: req.params.id })
        .populate('supplier') //associating our product with the supplier
        .exec(function (err, product) {
        //findind suppliers not in our product supplier list
        supplier_js_1.default.find({ _id: { $nin: product === null || product === void 0 ? void 0 : product.supplier } }, function (err, suppliers) {
            if (err) {
                return next(err);
            }
            if (product === null) {
                var err = new Error("Product not found");
                err.status = 404;
                next(err);
            }
            res.status(201).send(product);
        });
    });
});
//add product to db
router.post('/add', verifyToken_js_1.default, function (req, res, next) {
    //add  product to the database
    product_js_1.default.create(req.body, function (err, data) {
        if (err)
            return next(err);
        else
            res.status(201).send(data);
    });
});
//updating product
router.put('/product/update/:id', verifyToken_js_1.default, function (req, res, next) {
    //find the product using id
    product_js_1.default.updateOne({ _id: req.params.id }, __assign({}, req.body), function (err, data) {
        if (err) {
            return next(err);
        }
        else {
            res.status(201).send(data);
        }
        ;
    });
});
//delete product
router.delete('/product/delete/:id', verifyToken_js_1.default, function (req, res, next) {
    //delete using id
    product_js_1.default.deleteOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            return next(err);
        }
        else {
            res.status(201).send(data);
        }
    });
});
