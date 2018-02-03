import * as express from 'express';

export const authenticatedApi = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
}

export const tenantAuthorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (req.user.tenantId !== req.params.tenantId) {
        res.sendStatus(403);
    } else {
        next();
    }

}