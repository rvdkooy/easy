import * as express from 'express';
import * as mongoose from 'mongoose';
import { IUserModel } from '../db/userModel';
import { LoggerInstance } from 'winston';

const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
  logger.error(`The following error occured: ${error.message}`);
  res.sendStatus(400);
};

const createMiddleware = (userModelInstance: mongoose.Model<IUserModel>, logger: LoggerInstance) => {
  router.get('/users', (req, res) => {
    userModelInstance.find({}).exec()
    .then(docs => res.send(docs.map(createListModel)))
    .catch(err => handleError(err, res, logger));
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
    .catch(err => handleError(err, res, logger));
  });

  router.delete('/users/:id', (req, res) => {
    userModelInstance.remove({ _id: req.params.id }).exec()
      .then(() => res.sendStatus(200))
      .catch(err => handleError(err, res, logger));
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