import * as express from 'express';
import * as mongoose from 'mongoose';
import { protectApi } from '../security/protectApi';
import { IContentPageModel, IContentPage } from '../db/contentPage';
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

const createListModel = (doc: IContentPageModel) => {
  return {
    id: doc._id,
    name: doc.name,
    url: doc.url,
    published: doc.published
  };
};

export default createMiddleware;