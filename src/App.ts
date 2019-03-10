import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import UserRouter from './routes/UserRouter';
import * as mongoose from "mongoose";


class App {

    public express: express.Application;
    public mongoUrl: string = 'mongodb://localhost:27017/typescript_express';

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.mongoSetup();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World! Request typescripts running'
            });
        });
        this.express.use('/', router);
        this.express.use('/user', UserRouter);
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});
    }
}

export default new App().express;
