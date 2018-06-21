import * as express from 'express';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';
import { LoggerInstance } from 'winston';
import { findContentPageByUrl } from '../db/contentPageModel';
import { findTenantBySite } from '../db/tenantModel';

const createMiddleware = (
        rootDir: string,
        logger: LoggerInstance) => {
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

    router.get('/*', async (req, res) => {
        const tenant = await findTenantBySite(req.hostname);
        if (tenant) {
            const contentPage = await findContentPageByUrl(tenant.tenantId, req.path);
            if (contentPage) {
                const model = {
                    title: contentPage.title,
                    content: contentPage.content,
                    description: contentPage.description,
                    keywords: contentPage.keywords,
                };

                handleCustomTheme(req, res, model, tenant.tenantId);
            } else {
                res.render('404');
            }
        } else {
            res.render('easy', { layout: null });
        }
    });

    const handleCustomTheme = async (
        req: express.Request,
        res: express.Response,
        model: object,
        tenantId: string,
    ) => {
        const customThemeFile = path.resolve(rootDir, `./localfiles/themes/${tenantId}/layout.hbs`);

        fs.stat(customThemeFile, (err, stat) => {
            if (err) {
                res.render('index', model);
            } else {
                fs.readFile(path.resolve(customThemeFile), 'utf8', (fsErr, data) => {
                    if (fsErr) {
                        logger.error(fsErr.message);
                        res.send(400);
                    }

                    const template = Handlebars.compile(data);
                    res.send(template(model));
                });
            }
        });
    };

    return router;
};

export default createMiddleware;
