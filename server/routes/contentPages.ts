import * as express from 'express';
import * as mongoose from 'mongoose';
import { protectApi } from '../security/protectApi';
import { check, validationResult } from 'express-validator/check'
import ContentPageModel, { IContentPageModel, IContentPage } from '../db/contentPage';
const router = express.Router();

const handleError = (error: Error, res: express.Response) => {
    console.error(error);
    res.sendStatus(400);
};

const createMiddleware = (contentModelInstance: mongoose.Model<IContentPageModel>) => {
    router.all('*', protectApi);

    router.get('/contentpages', (req, res) => {
        contentModelInstance.find({}).exec()
            .then(docs => res.send(docs.map(createListModel)))
            .catch(err => handleError(err, res));
    });

    router.post('/contentpages', (req, res) => {
        validateFromRequest(req, res, () => {

            var newContentPage = new ContentPageModel({
                name: req.body.name,
                url: req.body.url,
                content: req.body.content,
                template: 'default',
                published: true 
            });

            newContentPage.save()
                .then(() => res.sendStatus(200))
                .catch(err => handleError(err, res));
        });
    });

    //   router.get('/users/current', (req, res) => {
    //     if (req.user) {
    //       res.send(req.user);
    //     } else {
    //       res.sendStatus(404);
    //     }
    //   });

    //   router.get('/users/:id', (req, res) => {
    //     userModelInstance.findById(req.params.id).exec()
    //     .then(doc => {
    //       if (doc) {
    //         res.send(createEditModel(doc));
    //       } else {
    //         res.sendStatus(404);
    //       }
    //     })
    //     .catch(err => handleError(err, res));
    //   });

    //   router.delete('/users/:id', (req, res) => {
    //     userModelInstance.remove({ _id: req.params.id }).exec()
    //       .then(() => res.sendStatus(200))
    //       .catch(err => handleError(err, res));
    //   });

    return router;
}

// const createEditModel = (doc: IContentPageModel) => {
//   return {
//     id: doc._id,
//     displayName: doc.displayName,
//     email: doc.email,
//     photo: doc.photo,
//     gender: doc.gender,
//     provider: doc.provider
//   };
// };

const validateFromRequest = (request: express.Request, response: express.Response, successHandler: () => void) => {
    check('name', 'Name cannot be empty').not().isEmpty;
    check('url', 'Url cannot be empty').not().isEmpty;
    check('template', 'Template cannot be empty').not().isEmpty;

    const result = validationResult(request);
    if (!result.isEmpty()) {
      response.status(400).json({validationErrors: result.array()});
    } else {
      successHandler();
    }
  };

const createListModel = (doc: IContentPageModel) => {
    return {
        id: doc._id,
        name: doc.name,
        url: doc.url,
        published: doc.published
    };
};

export default createMiddleware;