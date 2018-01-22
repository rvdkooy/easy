import * as fs from 'fs';

export const ensureDirExistsSync = (path: string) => {
    
    try {
        const stats = fs.statSync(path);
    } catch (err) {
        fs.mkdirSync(path);
    }
}

export default {
    ensureDirExistsSync
}