import * as express from 'express';
import * as multer from 'multer';
import { LoggerInstance } from 'winston';
import { ThemeProvider } from '../infrastructure/themeProvider';
import { tenantAuthorize } from '../security/protectApi';

const upload = multer();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
    logger.error(`The following error occured: ${error.message}`);
    res.sendStatus(400);
};

const createMiddleware = (
    themeProvider: ThemeProvider,
    logger: LoggerInstance,
) => {
    const router = express.Router();
    router.get('/:tenantId/theme', tenantAuthorize, async (req, res) => {
        try {
            const theme = await themeProvider.getThemeFor(req.params.tenantId);
            if (theme) {
                res.send({
                    theme,
                });
            } else {
                res.sendStatus(404);
            }
        } catch (err) {
            handleError(err, res, logger);
        }
    });
    router.post('/:tenantId/theme', tenantAuthorize, upload.single('file'), async (req, res) => {
        const tenantId = req.params.tenantId;
        const uploadedFile = req.file;
        if (!uploadedFile || !uploadedFile.originalname.endsWith('.zip')) {
            res.status(400).json({ validationErrors: ['Zip file is required'] });
        } else {
            try {
                await themeProvider.newOrUpdate(tenantId, uploadedFile.buffer);
                res.sendStatus(200);
            } catch (err) {
                handleError(err, res, logger);
            }
        }
    });

    return router;
};

export default createMiddleware;
