import * as express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';
import { LoggerInstance } from 'winston';
import { unzip } from '../infrastructure';
import { ensureDirExists } from '../infrastructure/fsUtils';
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
    router.get('/:tenantId/theme', tenantAuthorize, async (req, res) => {
        try {
            res.sendStatus(404);
        } catch (err) {
            handleError(err, res, logger);
        }
    });
    router.post('/:tenantId/theme', tenantAuthorize, upload.single('file'), (req, res) => {
        const tenantId = req.params.tenantId;
        const uploadedFile = req.file;

        if (!uploadedFile || !uploadedFile.originalname.endsWith('.zip')) {
            res.status(400).json({ validationErrors: ['Zip file is required'] });
        } else {
            const tenantLocalThemeDir = path.resolve(rootDir, `./localfiles/themes/${tenantId}`);
            ensureDirExists(tenantLocalThemeDir).then(() => {
                const tempZipFileName = `./localfiles/tmp/${tenantId}_${new Date().getTime()}_theme.zip`;
                const tmZipFile = path.resolve(rootDir, tempZipFileName);

                fs.writeFileSync(tmZipFile, uploadedFile.buffer);

                return unzip(tmZipFile, tenantLocalThemeDir).then(() => {
                    fs.unlinkSync(tmZipFile);

                    s3Client.uploadFile(`${tenantId}/themes/theme.zip`, uploadedFile.buffer)
                        .then(() => res.sendStatus(200))
                        .catch((err) => handleError(err, res, logger));
                })
                .catch((err) => handleError(err, res, logger));
            })
            .catch((err) => handleError(err, res, logger));
        }
    });

    // router.delete('/:tenantId/files', tenantAuthorize, async (req, res) => {
    //     try {
    //         const tenantId = req.params.tenantId;
    //         await s3Client.deleteFile(req.body.key);
    //         res.send(200);
    //     } catch (err) {
    //         handleError(err, res, logger);
    //     }
    // });

    return router;
};

export default createMiddleware;
