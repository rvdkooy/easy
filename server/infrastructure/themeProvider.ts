import * as fs from 'fs';
import * as path from 'path';
import { unzip } from '../infrastructure';
import { ensureDirExists } from '../infrastructure/fsUtils';

export interface ThemeProvider {
    unpack: (tenantId: string, file: Buffer) => Promise<undefined>;
}

const createThemeProvider = (rootDir: string): ThemeProvider => {
    return {
        unpack: (tenantId: string, file: Buffer) => {
            return new Promise(async (resolve, reject) =>  {
                try {
                    const tenantLocalThemeDir = path.resolve(rootDir, `./localfiles/themes/${tenantId}`);
                    await ensureDirExists(tenantLocalThemeDir);

                    const tempFilePath = path.resolve(
                        rootDir,
                        `./localfiles/tmp/${tenantId}_${new Date().getTime()}_theme.zip`,
                    );

                    fs.writeFileSync(tempFilePath, file);

                    await unzip(tempFilePath, tenantLocalThemeDir);
                    fs.unlinkSync(tempFilePath);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },
    };
};

export default createThemeProvider;
