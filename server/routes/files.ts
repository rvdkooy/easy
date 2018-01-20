import * as express from 'express';
import { protectApi } from '../security/protectApi';
import { check, validationResult } from 'express-validator/check'
import { LoggerInstance } from 'winston';
import { S3Client } from '../infrastructure/storageService';
import * as multer from 'multer';

const upload = multer();
const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
    logger.error(`The following error occured: ${error.message}`);
    res.sendStatus(400);
};

const createMiddleware = (s3Client: S3Client, logger: LoggerInstance
) => {
    router.all('*', protectApi);

    router.get('/files', (req, res) => {
        s3Client.listFiles()
            .then(result => {
                if (result.Contents) {
                    res.send(result.Contents.map((file) => ({
                        key: file.Key,
                        lastModified: file.LastModified,
                        etag: file.ETag,
                        size: file.Size
                    })));
                } else {
                    res.send([]);
                }
            })
            .catch(err => handleError(err, res, logger))
    });

    router.post('/files/upload', upload.single('file'), (req, res) => {
        const file = req.file;

        if (!file) {
            res.status(400).json({ validationErrors: ["File is required"] });
        } else {
            s3Client.uploadFile(file.originalname, file.buffer)
                .then(() => {
                    res.send(200);
                })
                .catch(err => handleError(err, res, logger));
        }
    });

    router.delete('/files/:key', (req, res) => {

        s3Client.deleteFile(req.params.key)
            .then(() => {
                res.send(200);
            })
            .catch(err => handleError(err, res, logger));
    });

    return router;
}

export default createMiddleware;