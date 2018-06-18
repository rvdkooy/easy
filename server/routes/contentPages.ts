import * as express from 'express';
import * as mongoose from 'mongoose';

import { check, validationResult } from 'express-validator/check'
import ContentPageModel, { IContentPageModel, IContentPage, findContentPagesByTenantId, findContentPageByIdAndTenantId } from '../db/contentPageModel';
import { LoggerInstance } from 'winston';
import { tenantAuthorize } from '../security';

const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
    logger.error(`The following error occured: ${error.message}`);
    res.sendStatus(400);
};

const createMiddleware = (contentModelInstance: mongoose.Model<IContentPageModel>, logger: LoggerInstance
) => {
    router.get('/:tenantId/contentpages', tenantAuthorize, (req, res) => {
        findContentPagesByTenantId(req.params.tenantId)
            .then(docs => res.send(docs.map(createListModel)))
            .catch(err => handleError(err, res, logger));
    });

    router.post('/:tenantId/contentpages', tenantAuthorize, (req, res) => {
        validateFromRequest(req, res, logger, () => {
            var newContentPage = new ContentPageModel({
                tenantId: req.params.tenantId,
                title: req.body.title,
                url: req.body.url,
                content: req.body.content,
                template: 'default',
                published: true,
                keywords: req.body.keywords,
                description: req.body.description
            });

            newContentPage.save()
                .then(() => {
                    logger.info(`Creation of contentpage with title '${req.body.title}' was successful`);
                    res.sendStatus(200)
                })
                .catch(err => handleError(err, res, logger));
        });
    });

    router.put('/:tenantId/contentpages/:id', tenantAuthorize, async (req, res) => {
        validateFromRequest(req, res, logger, async () => {

            const doc = await findContentPageByIdAndTenantId(req.params.tenantId, req.params.id);

            if (!doc) {
                res.sendStatus(404);
            } else {
                const updates = {
                    title: req.body.title,
                    url: req.body.url,
                    content: req.body.content,
                    published: req.body.publised,
                    keywords: req.body.keywords,
                    description: req.body.description
                };

                try {
                    await contentModelInstance.findByIdAndUpdate({ _id: req.params.id, tenantId: req.params.tenantId }, { $set: updates }).exec();
                    logger.info(`Update of contentpage with title '${req.body.title}' was successful`);
                    res.sendStatus(200);
                } catch (ex) {
                    handleError(ex, res, logger);
                }
            }
        });
    });

    router.get('/:tenantId/contentpages/:id', tenantAuthorize, (req, res) => {
        findContentPageByIdAndTenantId(req.params.tenantId, req.params.id)
            .then(doc => {
                if (!doc) {
                    res.sendStatus(404);
                } else {
                    res.send(createEditModel(doc));
                }
            })
            .catch(err => handleError(err, res, logger));
    });

    router.delete('/:tenantId/contentpages/:id', tenantAuthorize, (req, res) => {
        contentModelInstance.remove({ tenantId: req.params.tenantId, _id: req.params.id }).exec()
            .then(() => {
                logger.info(`Deletion of contentpage with id '${req.params.id}' was successful`);
                res.sendStatus(200)
            })
            .catch(err => handleError(err, res, logger));
    });

    return router;
}

const createEditModel = (doc: IContentPageModel) => {
    return {
        id: doc._id,
        title: doc.title,
        url: doc.url,
        content: doc.content,
        published: doc.published,
        description: doc.description,
        keywords: doc.keywords
    };
};

const validateFromRequest = (request: express.Request, response: express.Response, logger: LoggerInstance, successHandler: () => void) => {
    check('name', 'Name cannot be empty').not().isEmpty;
    check('url', 'Url cannot be empty').not().isEmpty;
    check('template', 'Template cannot be empty').not().isEmpty;

    const result = validationResult(request);
    if (!result.isEmpty()) {
        const validationErrors = result.array();

        validationErrors.forEach(err => logger.error(`Validation error: '${err}' occured!`));

        response.status(400).json({ validationErrors: validationErrors });
    } else {
        successHandler();
    }
};

const createListModel = (doc: IContentPageModel) => {
    return {
        id: doc._id,
        title: doc.title,
        url: doc.url,
        published: doc.published
    };
};

export default createMiddleware;