import * as express from 'express';
import * as expressSession from 'express-session';
import * as connectMongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import configurePassport from './security/pasportConfig';
import { setupLogger } from './infrastructure/logging';
import { connect as dbConnect } from './db/index';
import defaultRoutes from './routes/default';
import usersRoutes from './routes/users';
import loggingRoutes from './routes/logging';

import UserModel from './db/userModel';

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
    configurePassport(app, logger);

    app.use('/static', express.static(path.join(rootDir, 'static')));
    
    app.use('/api', usersRoutes(UserModel));
    app.use('/api', loggingRoutes(mongooseConnection));
    app.use('/', defaultRoutes)
    

    logger.info('easy has started up...');
    
    return app;
}

export default createApp;
