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
        title: req.body.title,
        url: req.body.url,
        content: req.body.content,
        template: 'default',
        published: true,
        keywords: req.body.keywords,
        description: req.body.description
      });

      newContentPage.save()
        .then(() => res.sendStatus(200))
        .catch(err => handleError(err, res));
    });
  });

  router.put('/contentpages/:id', async (req, res) => {
    validateFromRequest(req, res, async () => {

      const doc = await contentModelInstance.findById(req.params.id).exec()

      if (doc) {
        const updates = {
          title: req.body.title,
          url: req.body.url,
          content: req.body.content,
          published: req.body.publised,
          keywords: req.body.keywords,
          description: req.body.description
        };

        try {
          await contentModelInstance.findByIdAndUpdate({ _id: req.params.id }, { $set: updates }).exec();
          res.sendStatus(200);
        } catch (ex) {
          handleError(ex, res);
        }
      } else {
        res.sendStatus(404);
      }
    });
  });

  router.get('/contentpages/:id', (req, res) => {
    contentModelInstance.findById(req.params.id).exec()
      .then(doc => {
        if (doc) {
          res.send(createEditModel(doc));
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => handleError(err, res));
  });

  router.delete('/contentpages/:id', (req, res) => {
    contentModelInstance.remove({ _id: req.params.id }).exec()
      .then(() => res.sendStatus(200))
      .catch(err => handleError(err, res));
  });

  return router;
}

const createEditModel = (doc: IContentPageModel) => {
  return {
    id: doc._id,
    title: doc.title,
    url: doc.url,
    content: doc.content,
    published: doc.published,
    description: doc.description,
    keywords: doc.keywords
  };
};

const validateFromRequest = (request: express.Request, response: express.Response, successHandler: () => void) => {

  check('name', 'Name cannot be empty').not().isEmpty;
  check('url', 'Url cannot be empty').not().isEmpty;
  check('template', 'Template cannot be empty').not().isEmpty;

  const result = validationResult(request);
  if (!result.isEmpty()) {
    response.status(400).json({ validationErrors: result.array() });
  } else {
    successHandler();
  }
};

const createListModel = (doc: IContentPageModel) => {
  return {
    id: doc._id,
    title: doc.title,
    url: doc.url,
    published: doc.published
  };
};

export default createMiddleware;