import * as mkdirp from 'mkdirp';

export const ensureDirExists = (dirPath: string) => {
    return new Promise((resolve, reject) => {
        mkdirp(dirPath, (err: Error) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export default {
    ensureDirExists,
};
