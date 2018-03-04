import * as path from 'path';
import * as config from 'config';
import * as mongoose from 'mongoose';
import TenantModel, { ITenantModel, findTenantByEmail } from '../db/tenantModel';
import { ensureDirExists } from './fsUtils';
import { S3Client } from './storageService';
import { LoggerInstance } from 'winston';

export const setupEnvironment = (rootDir: string, s3Client: S3Client, logger: LoggerInstance) => {
    ensureDirExists(path.resolve(rootDir, './localfiles/tmp'));
    ensureDirExists(path.resolve(rootDir, './localfiles/themes'));
    ensureS3BucketsExists(s3Client);
    ensureRootAccountIsCreatedAsSpecialTenant(logger);
}

const ensureS3BucketsExists = (s3Client: S3Client) => {
    s3Client.createBucket();
}

const ensureRootAccountIsCreatedAsSpecialTenant = (logger: LoggerInstance) => {
    const ROOT_ACCOUNT = config.get('ROOT_ACCOUNT') as string;

    findTenantByEmail(ROOT_ACCOUNT).then(tenant => {
        if (!tenant) {
            var newTenant = new TenantModel({
                tenantId: '*',
                sites: '*',
                email: ROOT_ACCOUNT
            });
            
            newTenant.save()
                .then(() => logger.info(`Created a tenant for the root account: '${ROOT_ACCOUNT}'`))
                .catch(err => logger.error(err));
        }
    });
}