import * as express from 'express';
import * as mongoose from 'mongoose';
import { IContentPageModel, findContentPageByUrl } from '../db/contentPage';

const createMiddleware = (contentModelInstance: mongoose.Model<IContentPageModel>) => {
    const router = express.Router();
    
    router.get(['/admin', '/admin/*', '!/admin/api/*'], (req, res) => {
        res.render('admin', { title: 'Easy Admin', layout: null });
    });
    
    router.get('/login', (req, res, next) => {
        res.render('login', { title: 'Easy Admin login', layout: null });
    });
    
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    router.get('/*', (req, res) => {
        findContentPageByUrl(req.path).then(contentPage => {
            if (contentPage) {
                res.render('index', { 
                    title: contentPage.name,
                    content: contentPage.content
                });
            } else {
                res.render('404');
            }
        });
    });

    return router;
};

export default createMiddleware;