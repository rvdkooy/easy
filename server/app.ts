import * as express from 'express';
import * as expressSession from 'express-session';
import * as connectMongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { Config } from './config';
import { authenticatedApi, configurePassport } from './security';
import { setupLogger, createS3Client, setupEnvironment  } from './infrastructure/';
import { connect as dbConnect, ContentPageModel, UserModel, TenantModel } from './db';
import { defaultRoutes, usersRoutes, contentPagesRoutes, loggingRoutes, filesRoutes } from './routes';


const MongoStore = connectMongo(expressSession);
const createApp = (config: Config, rootDir: string) => {
    const app = express();
    
    const mongooseConnection = dbConnect(config.DATABASE_CONNECTION_STRING);
    const logger = setupLogger(app, config.DATABASE_CONNECTION_STRING);
    const s3Client = createS3Client(config.AWS, logger);

    setupEnvironment(rootDir, s3Client, logger);

    app.use(expressSession({ 
        secret: config.SESSION_SECRET ,
        store: new MongoStore({ mongooseConnection: mongooseConnection }),
        resave: false,
        saveUninitialized: true,
    }));
    app.set('views', path.join(rootDir, 'views'));
    app.set('view engine', 'hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    configurePassport(app, TenantModel, logger);

    app.use('/static', express.static(path.join(rootDir, 'static')));
    
    app.use('/admin/api', 
        authenticatedApi,
        contentPagesRoutes(ContentPageModel, logger),
        usersRoutes(UserModel, logger),
        loggingRoutes(mongooseConnection),
        filesRoutes(rootDir, s3Client, logger),
        (req, res) => res.send(404)
    );
    app.use('/', defaultRoutes(rootDir, logger, ContentPageModel))
    
    logger.info('easy has started up...');
    
    return app;
}

export default createApp;
