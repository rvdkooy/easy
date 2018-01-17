import * as express from 'express';
import { protectApi } from '../security/protectApi';
import { check, validationResult } from 'express-validator/check'
import { LoggerInstance } from 'winston';
import { S3Client } from '../infrastructure/storageService';

const router = express.Router();

const handleError = (error: Error, res: express.Response, logger: LoggerInstance) => {
  logger.error(`The following error occured: ${error.message}`);
  res.sendStatus(400);
};

const createMiddleware = (s3Client: S3Client, logger: LoggerInstance
) => {
  router.all('*', protectApi);

  router.get('/files', (req, res) => {
    s3Client.listFiles()
      .then(result => {
        if (result.Contents) {
          res.send(result.Contents.map((file) => ({
            key: file.Key,
            lastModified: file.LastModified,
            etag: file.ETag,
            size: file.Size
          })));
        } else {
          res.send([]);
        }
      })
      .catch(err => handleError(err, res, logger))
  });

  // router.post('/files/upload', (req, res) => {
  //   validateFromRequest(req, res, logger, () => {


  //     res.send(200);
  //   });
  // });

  return router;
}

const validateFromRequest = (request: express.Request, response: express.Response, logger: LoggerInstance, successHandler: () => void) => {

  check('name', 'Name cannot be empty').not().isEmpty;
  check('key', 'Key cannot be empty').not().isEmpty;

  const result = validationResult(request);
  if (!result.isEmpty()) {
    const validationErrors = result.array();

    validationErrors.forEach(err => logger.error(`Validation error: '${err}' occured!`));

    response.status(400).json({ validationErrors: validationErrors });
  } else {
    successHandler();
  }
};

export default createMiddleware;