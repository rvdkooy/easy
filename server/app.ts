import * as bodyParser from 'body-parser';
import * as connectMongo from 'connect-mongo';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as path from 'path';

import { Config } from './config';
import { connect as dbConnect, ContentPageModel, TenantModel, UserModel } from './db';
import { createS3Client, setupEnvironment, setupLogger  } from './infrastructure/';
import createThemeProvider from './infrastructure/themeProvider';
import { contentPagesRoutes, defaultRoutes, filesRoutes,
    loggingRoutes, tenantRoutes, themeRoutes, usersRoutes } from './routes';
import { authenticatedApi, configurePassport } from './security';

const MongoStore = connectMongo(expressSession);
const createApp = (config: Config, rootDir: string) => {
    const app = express();

    const mongooseConnection = dbConnect(config.DATABASE_CONNECTION_STRING);
    const logger = setupLogger(app, config.DATABASE_CONNECTION_STRING);
    const s3Client = createS3Client(config.AWS, logger);
    const themeProvider = createThemeProvider(rootDir, s3Client);
    setupEnvironment(rootDir, s3Client, logger, themeProvider);

    app.use(expressSession({
        secret: config.SESSION_SECRET ,
        store: new MongoStore({ mongooseConnection }),
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
        themeRoutes(s3Client, themeProvider, logger),
        tenantRoutes(TenantModel, logger),
        (req, res) => res.send(404),
    );
    app.use('/', defaultRoutes(rootDir, logger));

    logger.info('easy has started up...');

    return app;
};

export default createApp;
