import * as express from 'express';
import * as expressSession from 'express-session';
import * as connectMongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { protectApi, configurePassport } from './security';
import { setupLogger, createS3Client  } from './infrastructure/';
import { connect as dbConnect, ContentPageModel, UserModel } from './db';
import { defaultRoutes, usersRoutes, contentPagesRoutes, loggingRoutes, filesRoutes } from './routes';

const MongoStore = connectMongo(expressSession);
const createApp = (settings: any, rootDir: string) => {
    const app = express();
    
    const mongooseConnection = dbConnect(settings.DATABASE_CONNECTION_STRING);
    const logger = setupLogger(app, settings.DATABASE_CONNECTION_STRING);
    const s3Client = createS3Client(settings.AWS, logger);

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
    
    app.use('/admin/api', 
        protectApi,
        contentPagesRoutes(ContentPageModel, logger),
        usersRoutes(UserModel, logger),
        loggingRoutes(mongooseConnection),
        filesRoutes(s3Client, logger)
    );
    app.use('/', defaultRoutes(ContentPageModel))
    
    logger.info('easy has started up...');
    
    return app;
}

export default createApp;
