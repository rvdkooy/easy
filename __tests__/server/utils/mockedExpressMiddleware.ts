import * as express from 'express';

export const addUser = (user?: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.user = user || {
        tenantId: "100"
    };
    next();
}