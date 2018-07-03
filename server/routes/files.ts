import * as express from 'express';
import * as multer from 'multer';
import { LoggerInstance } from 'winston';
import { S3Client } from '../infrastructure/storageService';
import { tenantAuthorize } from '../security/protectApi';

const upload = multer();
const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
    logger.error(`The following error occured: ${error.message}`);
    res.sendStatus(400);
};

const createMiddleware = (
    rootDir: string,
    s3Client: S3Client,
    logger: LoggerInstance,
) => {
    router.get('/:tenantId/files', tenantAuthorize, async (req, res) => {
        try {
            const tenantId = req.params.tenantId;
            const result = await s3Client.listFiles(tenantId);
            if (result.Contents) {
                res.send(result.Contents.map((file) => ({
                    key: file.Key,
                    lastModified: file.LastModified,
                    etag: file.ETag,
                    size: file.Size,
                })));
            } else {
                res.send([]);
            }
        } catch (err) {
            handleError(err, res, logger);
        }
    });

    router.post('/:tenantId/files/upload', tenantAuthorize, upload.single('file'), (req, res) => {
        const tenantId = req.params.tenantId;
        const uploadedFile = req.file;

        if (!uploadedFile) {
            res.status(400).json({ validationErrors: ['File is required'] });
        } else {
            const key = `${tenantId}/docs/${uploadedFile.originalname}`;
            s3Client.uploadFile(key, uploadedFile.buffer)
                .then(() => res.sendStatus(200))
                .catch((err) => handleError(err, res, logger));
        }
    });

    router.delete('/:tenantId/files', tenantAuthorize, async (req, res) => {
        try {
            const tenantId = req.params.tenantId;
            await s3Client.deleteFile(req.body.key);
            res.send(200);
        } catch (err) {
            handleError(err, res, logger);
        }
    });

    return router;
};

export default createMiddleware;
