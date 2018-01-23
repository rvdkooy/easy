import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { check, validationResult } from 'express-validator/check'
import { LoggerInstance } from 'winston';
import { S3Client } from '../infrastructure/storageService';
import { unzip, fsUtils } from '../infrastructure';
import * as multer from 'multer';
import { loadavg } from 'os';

const upload = multer();
const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
    logger.error(`The following error occured: ${error.message}`);
    res.sendStatus(400);
};

const createMiddleware = (rootDir: string, s3Client: S3Client, logger: LoggerInstance
) => {
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
        let uploadedFile = req.file;

        if (!uploadedFile) {
            res.status(400).json({ validationErrors: ["File is required"] });
        } else {

            // temp theme logic
            if (uploadedFile.originalname === 'theme.zip') {
                try {
                    const outputFolder = path.resolve(rootDir, 'localfiles/themes');
                    const tmZipFile = path.resolve(rootDir, 'localfiles/tmp/tmp_theme.zip');
                    
                    fs.writeFileSync(tmZipFile, uploadedFile.buffer);
                    
                    unzip(tmZipFile, outputFolder).then((files) => {
                        fs.unlinkSync(tmZipFile);
    
                        const promises: Promise<any>[] = [];
                        for (let file of files) {
                            let key = `theme/${file}`;
    
                            const buff = fs.readFileSync(path.resolve(outputFolder, file));
                            promises.push(s3Client.uploadFile(key, buff));
                        }
    
                        Promise.all(promises)
                                .then(() => res.sendStatus(200))
                                .catch(err => handleError(err, res, logger));
                    })
                    .catch(err => handleError(err, res, logger));
                } catch (err) {
                    handleError(err, res, logger);
                }
            } else {
                let key = `docs/${uploadedFile.originalname}`;
                s3Client.uploadFile(key, uploadedFile.buffer)
                    .then(() => res.sendStatus(200))
                    .catch(err => handleError(err, res, logger));
            }
        }
    });

    router.delete('/files/:path*', (req, res) => {
        const path = req.param('path');
        const file = req.param("0");

        s3Client.deleteFile(path + file)
            .then(() => {
                res.send(200);
            })
            .catch(err => handleError(err, res, logger));
    });

    return router;
}

export default createMiddleware;