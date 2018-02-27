import * as aws from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerInstance } from 'winston';
import { AWS } from '../config';

const defaultRegion = 'eu-west-1';

export class S3Client {
    constructor(accessKeyId: string, secretAccessKey: string,
        bucketName: string, endpoint: string,
        logger: LoggerInstance) {

        const options: aws.S3.Types.ClientConfiguration = {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            s3ForcePathStyle: true,
            region: defaultRegion
        };

        if (process.env.NODE_ENV !== 'production') options.endpoint = endpoint;

        this.s3 = new aws.S3(options);
        this.bucketName = bucketName;
        this.logger = logger;
    }
    bucketName: string = 'easyadminsystem';
    logger: LoggerInstance;
    s3: aws.S3;

    uploadFile = (key: string, data: Buffer, acl?: string): Promise<aws.S3.PutObjectOutput> => {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Body: data,
                ACL: acl || 'public-read',
            };

            this.s3.putObject(params, (err, data) => {
                if (err) {
                    this.logger.error(`Error uploading object to bucket with name '${this.bucketName}' and key ('${key}') to s3: ${err.message}`);
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
                Bucket: this.bucketName,
                Prefix: prefix
            }, (err, data) => {
                if (err) {
                    this.logger.error(`Error listing objects from s3 with bucket name: '${this.bucketName}'`);
                    if (err.stack) this.logger.error(err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    deleteFile = (key: string): Promise<aws.S3.DeleteObjectOutput> => {
        return new Promise((resolve, reject) => {
            this.s3.deleteObject({
                Bucket: this.bucketName,
                Key: key
            }, (err, data) => {
                if (err) {
                    this.logger.error(`Error deleting object with key: '${key}' from bucket: '${this.bucketName}'`);
                    if (err.stack) this.logger.error(err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        });
    }

    createBucket = () => {
        this.listBuckets().then(data => {
            if (data.Buckets) {
                const found = data.Buckets.find(b => b.Name === this.bucketName);

                if (!found) {
                    this.logger.info(`No bucket found yet, creating: '${this.bucketName}'`);
                    this.s3.createBucket({
                        Bucket: this.bucketName,
                        ACL: 'public-read',
                        CreateBucketConfiguration: {
                            LocationConstraint: defaultRegion
                        }
                    }, (err, data) => {
                        if (err) {
                            this.logger.error(`Error creating a bucket with name: '${this.bucketName}'`);
                            if (err.stack) this.logger.error(err.stack);
                        }
                    });
                } else {
                    this.logger.info(`Bucket with name: '${this.bucketName}' found, skipping creation`);
                }
            }
        });
    }

    listBuckets = (): Promise<aws.S3.ListBucketsOutput> => {
        return new Promise((resolve, reject) => {
            this.s3.listBuckets((err, data) => {
                if (err) {
                    this.logger.error(`Error listing buckets`);
                    if (err.stack) this.logger.error(err.stack);
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export const createS3Client = (awsSettings: AWS, logger: LoggerInstance) => {
    return new S3Client(awsSettings.AUTH.ACCESSKEYID,
        awsSettings.AUTH.SECRETACCESSKEY,
        awsSettings.S3.BUCKETNAME,
        awsSettings.S3.ENDPOINT,
        logger);
}


// const file = path.join(rootDir, 'pdf-test.pdf');

// fs.readFile(file, (err, data) => {
//     if (err) { throw err; }
// });