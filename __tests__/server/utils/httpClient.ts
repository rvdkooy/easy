import * as request from 'request';

export const get = (url: string, options?: request.CoreOptions): Promise<request.Response> => {
    return new Promise((resolve, reject) => {
        request.get(url, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

export const post = (url: string, options?: request.CoreOptions): Promise<request.Response> => {
    return new Promise((resolve, reject) => {
        request.post(url, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

export const put = (url: string, options?: request.CoreOptions): Promise<request.Response> => {
    return new Promise((resolve, reject) => {
        request.put(url, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

export const del = (url: string, options?: request.CoreOptions): Promise<request.Response> => {
    return new Promise((resolve, reject) => {
        request.delete(url, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
