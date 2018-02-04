import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';

export interface TestHost {
    close: Function,
    listen: (port?: number) => void,
    express: express.Express
}

const createTestHost = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


    app.get('/test', (req, res) => {
        res.sendStatus(200);
    });
    
    var server = http.createServer(app);
    
    const close = (cb?: Function) => {
        server.close(cb);
    }
    
    const listen = (port?: number) => {
        server.listen(port || 1234);
    }
    
    return {
        close,
        listen,
        express: app
    };;
};


export default createTestHost;
