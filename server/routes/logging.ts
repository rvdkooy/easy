import * as express from 'express';
import * as mongoose from 'mongoose';
import { protectApi } from '../security/protectApi';

const router = express.Router();

const createMiddleware = (connection: mongoose.Connection) => {
    
    router.all('*', protectApi);
    
    router.get('/logs/latest/:number', (req: express.Request, res: express.Response) => {
        connection.db.collection('log', (err, collection) => {
            collection.find({}).sort({timestamp: -1}).limit(+req.params.number).toArray((err2, results) => {
                res.send(results.map(x => ({
                    id: x._id,
                    level: x.level,
                    message: x.message,
                    timestamp: x.timestamp,
                    meta: x.meta
                })));
            });
        });
    });

    return router;
};

export default createMiddleware;