import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';

export interface TestHost {
    close: (cb?: () => void) => void;
    listen: (port?: number) => void;
    express: express.Express;
}

const createTestHost = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/test', (req, res) => {
        res.sendStatus(200);
    });

    const server = http.createServer(app);

    const close = (cb?: () => void) => {
        app.removeAllListeners();
        server.close(cb);
    };

    const listen = (port?: number) => {
        server.listen(port || 1234);
    };

    return {
        close,
        listen,
        express: app,
    };
};

export default createTestHost;
