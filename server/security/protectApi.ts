import * as express from 'express';

export const protectApi = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
}