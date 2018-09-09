import StreamZip = require('node-stream-zip');

export const unzip = (zipFile: string, outputFolder: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {

        const zip = new StreamZip({
            file: zipFile,
            storeEntries: true,
        });

        zip.on('error', (err) => reject(err));
        zip.on('ready', () => {
            zip.extract(null, outputFolder, (err, count) => {
                if (err) {
                    zip.close();
                    reject(err.message);
                } else {
                    const zipEntries = zip.entries();
                    const files = Object.keys(zipEntries);
                    zip.close();
                    resolve(files);
                }
            });
        });
    });
}
