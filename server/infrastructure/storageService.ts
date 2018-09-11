import * as aws from 'aws-sdk';
import { AWS } from '../config';
const defaultRegion = 'eu-west-1';

export class S3Client {
    constructor(
        accessKeyId: string,
        secretAccessKey: string,
        bucketName: string,
        endpoint: string) {

        const options: aws.S3.Types.ClientConfiguration = {
            accessKeyId,
            secretAccessKey,
            s3ForcePathStyle: true,
            region: defaultRegion,
        };

        if (process.env.NODE_ENV !== 'production') { options.endpoint = endpoint; }

        this.s3 = new aws.S3(options);
        this.bucketName = bucketName;
    }
    bucketName: string = 'easyadminsystem';
    s3: aws.S3;

    uploadFile = (key: string, data: Buffer, acl?: string): Promise<aws.S3.PutObjectOutput> => {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: this.bucketName,
                Key: key,
                Body: data,
                ACL: acl || 'public-read',
            };

            this.s3.putObject(params, (err, putObjData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(putObjData);
                }
            });
        });
    }

    getFile = (key: string): Promise<aws.S3.GetObjectOutput> => {
        return new Promise((resolve, reject) => {
            this.s3.getObject({
                Bucket: this.bucketName,
                Key: key,
            }, (err, data) => {
                if (err) {
                    if (err.code === 'NoSuchKey') {
                        resolve();
                    } else {
                        reject(err);
                    }
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
                Prefix: prefix,
            }, (err, data) => {
                if (err) {
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
                Key: key,
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    createBucket = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            this.listBuckets().then((data) => {
                if (data.Buckets) {
                    const found = data.Buckets.find((b) => b.Name === this.bucketName);

                    if (!found) {
                        this.s3.createBucket({
                            Bucket: this.bucketName,
                            ACL: 'public-read',
                            CreateBucketConfiguration: {
                                LocationConstraint: defaultRegion,
                            },
                        }, (err, createData) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    }
                }
            });
        });
    }

    listBuckets = (): Promise<aws.S3.ListBucketsOutput> => {
        return new Promise((resolve, reject) => {
            this.s3.listBuckets((err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

export const createS3Client = (awsSettings: AWS) => {
    return new S3Client(awsSettings.AUTH.ACCESSKEYID,
        awsSettings.AUTH.SECRETACCESSKEY,
        awsSettings.S3.BUCKETNAME,
        awsSettings.S3.ENDPOINT);
};
