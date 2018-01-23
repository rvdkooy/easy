import * as path from 'path';
import { ensureDirExists } from './fsUtils';
import { S3Client } from './storageService';

export const setupEnvironment = (rootDir: string, s3Client: S3Client) => {
    ensureDirExists(path.resolve(rootDir, './localfiles/tmp'));
    ensureDirExists(path.resolve(rootDir, './localfiles/themes'));
    ensureS3BucketsExists(s3Client);
}

const ensureS3BucketsExists = (s3Client: S3Client) => {
    s3Client.createBucket();
}