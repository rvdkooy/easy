import * as express from 'express';

export const addUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.user = {
        tenantId: "100"
    };
    next();
}