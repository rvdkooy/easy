import * as express from 'express';
import * as expressSession from 'express-session';
import * as connectMongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { setupLogger } from './infrastructure/logging';
import { connect as dbConnect } from './db/index';
import defaultRoutes from './routes/default';

const MongoStore = connectMongo(expressSession);
const createApp = (settings: any, rootDir: string) => {
    const app = express();

    const mongooseConnection = dbConnect(settings.DB_URL);
    const logger = setupLogger(app, settings.DB_URL);
    
    app.use(expressSession({ 
        secret: settings.SESSION_SECRET ,
        store: new MongoStore({ mongooseConnection: mongooseConnection }),
        resave: false,
        saveUninitialized: true,
    }));
    app.set('views', path.join(rootDir, 'views'));
    app.set('view engine', 'hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/', defaultRoutes)

    logger.info('Judgify admin started up...');

    return app;
}

export default createApp;
