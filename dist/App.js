"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const UserRouter_1 = require("./routes/UserRouter");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.mongoUrl = 'mongodb://localhost:27017/typescript_express';
        this.express = express();
        this.middleware();
        this.routes();
        this.mongoSetup();
    }
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World! Request typescripts running'
            });
        });
        this.express.use('/', router);
        this.express.use('/user', UserRouter_1.default);
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map