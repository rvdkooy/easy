import * as express from 'express';


const ensureLoggedIn = () => {
  return function(req: express.Request, res: express.Response, next: express.NextFunction) {
    
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url;
      }
      return res.redirect('/login');
    }

    next();
  }
};
export default ensureLoggedIn;
