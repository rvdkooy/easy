import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import defaultRoutes from './routes/default';

const createApp = (options: any, rootDir: string) => {
    console.log(options);
    console.log(rootDir);
    
    const app = express();

    app.set('views', path.join(rootDir, 'views'));
    app.set('view engine', 'hbs');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/', defaultRoutes)

    return app;
}

export default createApp;
