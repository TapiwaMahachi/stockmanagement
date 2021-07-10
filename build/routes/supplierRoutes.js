"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierRoutes = void 0;
var express_1 = __importDefault(require("express"));
var supplierController_js_1 = require("../../../controller/supplierController.js");
var router = express_1.default.Router();
exports.supplierRoutes = router;
//get all suppliers
router.get('/all', supplierController_js_1.all_suppliers);
//add new supplier
router.post('/supplier/add', supplierController_js_1.create_supplier);
//route to associate our supplier to the product
router.post('/supplier/product/:id/', supplierController_js_1.add_supplier);
