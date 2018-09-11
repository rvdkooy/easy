import * as path from 'path';
import { LoggerInstance } from 'winston';
import { findAllTenants } from '../db/tenantModel';
import { ensureDirExists } from './fsUtils';
import { S3Client } from './storageService';
import { ThemeProvider } from './themeProvider';

export const setupEnvironment = (
    rootDir: string,
    s3Client: S3Client,
    logger: LoggerInstance,
    themeProvider: ThemeProvider,
) => {
    createLocalDirectoryStructure(rootDir, logger);
    ensureS3BucketsExists(s3Client, logger);
    syncLocalFilesWithS3(s3Client, themeProvider, logger);
};

const createLocalDirectoryStructure = (rootDir: string, logger: LoggerInstance) => {
    try {
        ensureDirExists(path.resolve(rootDir, './localfiles/tmp'));
        ensureDirExists(path.resolve(rootDir, './localfiles/themes'));
    } catch (err) {
        logger.error(err);
    }
};

const ensureS3BucketsExists = (s3Client: S3Client, logger: LoggerInstance) => {
    try {
        s3Client.createBucket();
    } catch (err) {
        logger.error(`Error creating a bucket with name: '${s3Client.bucketName}'`);
        if (err.stack) { logger.error(err.stack); }
    }
};

const syncLocalFilesWithS3 = async (s3Client: S3Client, themeProvider: ThemeProvider, logger: LoggerInstance) => {
    try {
        const tenants = await findAllTenants();
        tenants.forEach(async (t) => {
            const theme = await themeProvider.downloadTheme(t.tenantId);
            // check if there already?
            if (theme) {
                await themeProvider.unpack(t.tenantId, theme.Body as Buffer);
            }
        });
    } catch (err) {
        logger.error(err);
    }
};
