import * as express from 'express';
import * as mongoose from 'mongoose';
import { protectApi } from '../security/protectApi';
import { IUserModel } from '../db/userModel';
const router = express.Router();

const handleError = (error: Error, res: express.Response) => {
  console.error(error);
  res.sendStatus(400);
};

const createMiddleware = (userModelInstance: mongoose.Model<IUserModel>) => {
  router.all('*', protectApi);

  router.get('/users', (req, res) => {
    userModelInstance.find({}).exec()
    .then(docs => res.send(docs.map(createListModel)))
    .catch(err => handleError(err, res));
  });

  router.get('/users/current', (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else {
      res.sendStatus(404);
    }
  });

  router.get('/users/:id', (req, res) => {
    userModelInstance.findById(req.params.id).exec()
    .then(doc => {
      if (doc) {
        res.send(createEditModel(doc));
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => handleError(err, res));
  });

  router.delete('/users/:id', (req, res) => {
    userModelInstance.remove({ _id: req.params.id }).exec()
      .then(() => res.sendStatus(200))
      .catch(err => handleError(err, res));
  });

  return router;
}

const createEditModel = (doc: IUserModel) => {
  return {
    id: doc._id,
    displayName: doc.displayName,
    email: doc.email,
    photo: doc.photo,
    gender: doc.gender,
    provider: doc.provider
  };
};

const createListModel = (doc: IUserModel) => {
  return {
    id: doc._id,
    displayName: doc.displayName,
    email: doc.email,
    photo: doc.photo
  };
};

export default createMiddleware;