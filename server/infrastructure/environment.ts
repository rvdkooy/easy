import * as path from 'path';
import * as config from 'config';
import * as mongoose from 'mongoose';
import { ensureDirExists } from './fsUtils';
import { S3Client } from './storageService';
import { LoggerInstance } from 'winston';

export const setupEnvironment = (rootDir: string, s3Client: S3Client, logger: LoggerInstance) => {
    ensureDirExists(path.resolve(rootDir, './localfiles/tmp'));
    ensureDirExists(path.resolve(rootDir, './localfiles/themes'));
    ensureS3BucketsExists(s3Client);
}

const ensureS3BucketsExists = (s3Client: S3Client) => {
    s3Client.createBucket();
}
