"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var mongoose_1 = __importDefault(require("mongoose"));
var pusher_1 = __importDefault(require("pusher"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var path_1 = __importDefault(require("path"));
var auth_js_1 = require("./routes/auth.js");
var productRoute_js_1 = require("./routes/productRoute.js");
var supplierRoutes_js_1 = require("./routes/supplierRoutes.js");
//config the env
dotenv_1.default.config();
//app config
var app = express_1.default();
var port = process.env.PORT || 9000;
//parse body as json
app.use(express_1.default.json());
//parse cookies as object
app.use(cookie_parser_1.default());
//setting headers
app.use(cors_1.default());
//db config
mongoose_1.default.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//pusher for listening to db changes in realtime
var pusher = new pusher_1.default({
    appId: "1159115",
    key: "e6ecd84fa30f782c06ae",
    secret: "c432670c15ef6ff5cdbe",
    cluster: "mt1",
    useTLS: true
});
var db = mongoose_1.default.connection;
db.once('open', function () {
    var productCollection = db.collection('products');
    var changeStream = productCollection.watch();
    changeStream.on('change', function (change) {
        if (change.operationType === "insert") {
            var productDetail = change.fullDocument;
            pusher.trigger('product', 'inserted', {
                product: productDetail
            });
        }
    });
});
//Router middleware
app.use('/users', auth_js_1.authRoute);
app.use('/products', productRoute_js_1.prodRoute);
app.use('/suppliers', supplierRoutes_js_1.supplierRoutes);
//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static assets
    app.use(express_1.default.static('client/build'));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
//error handler
app.use(function (err, req, res, next) {
    // show error  msg
    res.status(err.status || 500);
    res.send("error " + err.message);
});
//listen
app.listen(port, function () { return console.log("listening to " + port); });
