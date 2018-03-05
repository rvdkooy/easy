import * as express from 'express';
import * as mongoose from 'mongoose';

import { check, validationResult } from 'express-validator/check'
import TenantModel, { ITenantModel, ITenant } from '../db/tenantModel';
import { LoggerInstance } from 'winston';
import { rootAuthorize } from '../security';

const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
    logger.error(`The following error occured: ${error.message}`);
    res.sendStatus(400);
};

const createMiddleware = (tenantModelInstance: mongoose.Model<ITenantModel>, logger: LoggerInstance
) => {
    router.get('/tenants', rootAuthorize, (req, res) => {
        tenantModelInstance.find().exec()
            .then(docs => res.send(docs.map(createListModel)))
            .catch(err => handleError(err, res, logger));
    });

    // CHECK IF EMAIL ADDRESS IS NOT ALREADY USED

    router.post('/tenants', rootAuthorize, (req, res) => {
        validateFromRequest(req, res, logger, () => {
            
            tenantModelInstance.findOne({ email: req.body.email }).exec().then(tenant => {
                if (!tenant) {
                    var newTenant = new TenantModel({
                        tenantId: 'random',
                        email: req.body.email,
                        sites: req.body.sites
                    });
        
                    newTenant.save()
                        .then(() => {
                            logger.info(`Creation of tenant for '${req.body.email}' was successful`);
                            res.sendStatus(200)
                        })
                        .catch(err => handleError(err, res, logger));
                } else {
                    const errorMessage = `Tenant for '${req.body.email}' already exists`;
                    logger.info(errorMessage);
                    res.sendStatus(400).json({ validationErrors: [ { msg: errorMessage } ] });;
                }
            });
        });
    });

    // router.put('/:tenantId/contentpages/:id', tenantAuthorize, async (req, res) => {
    //     validateFromRequest(req, res, logger, async () => {

    //         const doc = await findContentPageByIdAndTenantId(req.params.tenantId, req.params.id);

    //         if (!doc) {
    //             res.sendStatus(404);
    //         } else {
    //             const updates = {
    //                 title: req.body.title,
    //                 url: req.body.url,
    //                 content: req.body.content,
    //                 published: req.body.publised,
    //                 keywords: req.body.keywords,
    //                 description: req.body.description
    //             };

    //             try {
    //                 await contentModelInstance.findByIdAndUpdate({ _id: req.params.id, tenantId: req.params.tenantId }, { $set: updates }).exec();
    //                 logger.info(`Update of contentpage with title '${req.body.title}' was successful`);
    //                 res.sendStatus(200);
    //             } catch (ex) {
    //                 handleError(ex, res, logger);
    //             }
    //         }
    //     });
    // });

    router.get('/tenants/:id', rootAuthorize, (req, res) => {
        tenantModelInstance.findOne({ _id: req.params.id }).exec()
            .then(doc => {
                if (!doc) {
                    res.sendStatus(404);
                } else {
                    res.send(createEditModel(doc));
                }
            })
            .catch(err => handleError(err, res, logger));
    });

    // REMOVE ALL TENANT RELAED DATA? S3? LOCALFILES?
    // CHECK IF IT IS NOT THE ROOTADMIN TENANT?

    // router.delete('/:tenantId/contentpages/:id', tenantAuthorize, (req, res) => {
    //     contentModelInstance.remove({ tenantId: req.params.tenantId, _id: req.params.id }).exec()
    //         .then(() => {
    //             logger.info(`Deletion of contentpage with id '${req.params.id}' was successful`);
    //             res.sendStatus(200)
    //         })
    //         .catch(err => handleError(err, res, logger));
    // });

    return router;
}

const createEditModel = (doc: ITenantModel) => {
    return {
        id: doc._id,
        tenantId: doc.tenantId,
        email: doc.email,
        sites: doc.sites
    };
};

const validateFromRequest = (request: express.Request, response: express.Response, logger: LoggerInstance, successHandler: () => void) => {
    check('email', 'cannot be empty').not().isEmpty;
    check('sites', 'sites cannot be empty').not().isEmpty;

    const result = validationResult(request);
    if (!result.isEmpty()) {
        const validationErrors = result.array();

        validationErrors.forEach(err => logger.error(`Validation error: '${err}' occured!`));

        response.status(400).json({ validationErrors: validationErrors });
    } else {
        successHandler();
    }
};

const createListModel = (doc: ITenantModel) => {
    return {
        id: doc._id,
        tenantId: doc.tenantId,
        email: doc.email
    };
};

export default createMiddleware;