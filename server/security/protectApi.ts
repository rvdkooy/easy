import * as express from 'express';

export const authenticatedApi = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
};

export const tenantAuthorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user || (req.user.tenants.find((t: any) => t.tenantId === req.params.tenantId) === null )) {
        res.sendStatus(403);
    } else {
        next();
    }
};

export const rootAuthorize = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user || req.user.tenants.find((t: any) => t.tenantId === '*') === null) {
        res.sendStatus(403);
    } else {
        next();
    }
};
