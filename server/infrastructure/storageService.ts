import * as aws from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerInstance } from 'winston';

const bucketName = 'easyadminsystem';

export class S3Client {
    constructor(logger: LoggerInstance) {
        this.s3 = new aws.S3({
            accessKeyId: "accessKey1",
            secretAccessKey: "verySecretKey1",
            endpoint: 'http://127.0.0.1:8000',
            s3ForcePathStyle: true,
        });

        this.logger = logger;
    }
    logger: LoggerInstance;
    s3: aws.S3;

    uploadFile = (key: string, data: Buffer, acl?: string): Promise<aws.S3.PutObjectOutput> => {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: bucketName,
                Key: key,
                Body: data,
                ACL: acl || 'public-read',
            };
    
            this.s3.putObject(params, (err, data) => {
                if (err) {
                    this.logger.error(`Error uploading object to bucket with name '${bucketName}' and key ('${key}') to s3: ${err.message}`);
                    if (err.stack) this.logger.error(err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    listFiles = (prefix?: string): Promise<aws.S3.ListObjectsOutput> => {

        return new Promise((resolve, reject) => {
            this.s3.listObjects({
                Bucket: bucketName
            }, (err, data) => {
                if (err) {
                    this.logger.error(`Error listing objects from s3 with bucket name: '${bucketName}'`);
                    if (err.stack) this.logger.error(err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export default {
    createS3Client: (logger: LoggerInstance) => {    
        return new S3Client(logger);
    }
}

// const file = path.join(rootDir, 'pdf-test.pdf');

// fs.readFile(file, (err, data) => {
//     if (err) { throw err; }
// });