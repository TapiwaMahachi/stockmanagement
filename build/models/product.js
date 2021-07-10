"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
/**
 * product schema
 */
var productSchema = Schema({
    title: { type: String, required: true },
    image: {
        type: String,
        default: "https://pixabay.com/photos/edsel-ranger-taxi-cab-classic-car-392745/",
    },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0, },
    category: { type: String, required: true },
    threshold: { type: Number, min: 0, default: 0 },
    supplier: [{ type: Schema.ObjectId, ref: 'Supplier' }],
});
productSchema
    .virtual('url')
    .get(function () {
    return '/products/product/' + this._id;
});
exports.default = mongoose_1.default.model('Product', productSchema);
