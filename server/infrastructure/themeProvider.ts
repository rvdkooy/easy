import * as aws from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerInstance } from 'winston';
import { unzip } from '../infrastructure';
import { ensureDirExists } from '../infrastructure/fsUtils';
import { S3Client } from './storageService';

const themeKey = (tenantId: string) => `${tenantId}/themes/theme.zip`;

const createThemeProvider = (rootDir: string, s3Client: S3Client, logger: LoggerInstance): ThemeProvider => {
    return new ThemeProvider(
        rootDir,
        s3Client,
        logger,
    );
};

export class ThemeProvider {
    constructor(rootDir: string, s3Client: S3Client, logger: LoggerInstance) {
        this.s3Client = s3Client;
        this.rootDir = rootDir;
        this.logger = logger;
    }

    rootDir: string;
    s3Client: S3Client;
    logger: LoggerInstance;

    unpack = (tenantId: string, file: Buffer) => {
        return new Promise(async (resolve, reject) =>  {
            try {
                const tenantLocalThemeDir = path.resolve(this.rootDir, `./localfiles/themes/${tenantId}`);
                await ensureDirExists(tenantLocalThemeDir);

                const tempFilePath = path.resolve(
                    this.rootDir,
                    `./localfiles/tmp/${tenantId}_${new Date().getTime()}_theme.zip`,
                );

                fs.writeFileSync(tempFilePath, file);

                await unzip(tempFilePath, tenantLocalThemeDir);
                fs.unlinkSync(tempFilePath);
                resolve();
            } catch (err) {
                this.logger.error(err);
                reject(err);
            }
        });
    }

    downloadTheme = async (tenantId: string): Promise<aws.S3.GetObjectOutput | undefined> => {
        try {
            const theme = await this.s3Client.getFile(themeKey(tenantId));
            return theme;
        } catch (error) {
            this.logger.error(error.message);
            return;
        }
    }

    newOrUpdate = async (tenantId: string, file: Buffer) => {
        await this.s3Client.uploadFile(themeKey(tenantId), file);
        await this.unpack(tenantId, file);
    }
}

export default createThemeProvider;
