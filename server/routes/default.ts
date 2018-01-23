import * as express from 'express';
import * as mongoose from 'mongoose';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { IContentPageModel, findContentPageByUrl } from '../db/contentPageModel';
import { LoggerInstance } from 'winston';

const createMiddleware = (rootDir: string, logger: LoggerInstance, contentModelInstance: mongoose.Model<IContentPageModel>) => {
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

                const model = {
                    title: contentPage.title,
                    content: contentPage.content,
                    description: contentPage.description,
                    keywords: contentPage.keywords
                };

                handleCustomTheme(res, model);
            } else {
                res.render('404');
            }
        });
    });


    const handleCustomTheme = (res: express.Response, model: object) => {
        const customThemeFile = path.resolve(rootDir, './localfiles/themes/layout.hbs');

        fs.stat(customThemeFile, (err, stat) => {
            if (err) {
                res.render('index', model)
            } else {
                fs.readFile(path.resolve(customThemeFile), 'utf8', (err, data) => {
                    if (err) {
                        logger.error(err.message);
                        res.send(400);
                    }
                    
                    var template = Handlebars.compile(data);
                    res.send(template(model));
                });
            }
        });
    }

    return router;
};

export default createMiddleware;