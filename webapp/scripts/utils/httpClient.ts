const _errorListeners: HttpClientErrorListener[] = [];

const buildHeaders = async () => {
    const headers = {
        'Accept': 'application/problem+json, application/json',
        'Content-Type': 'application/json',
    } as { [key: string]: string };

    return headers;
};

const createRequest = (url: string, method: string, data?: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const requestInit = {
            body: (data) ? JSON.stringify(data) : undefined,
            credentials: 'include',
            headers: await buildHeaders(),
            method,
        } as RequestInit;

        fetch(url, requestInit).then((response) => {
            if (response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.indexOf('json') !== -1) {
                    response.json().then((json) => resolve(json));
                } else {
                    resolve(response);
                }
            } else {
                handleGlobalErrorResult(response);
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.indexOf('application/problem+json') !== -1) {
                    response.json().then((json) => reject(new ProblemDetails(json)));
                } else {
                    reject(response);
                }
            }
        })
        .catch((err) => {
            handleGlobalErrorResult(err);
            reject(err);
        });
    });
};

export function get(url: string) {
    return createRequest(url, 'GET');
}

export function post(url: string, data?: object) {
    return createRequest(url, 'POST', data);
}

export const postFormData = (url: string, formData: FormData) => {
    return new Promise((resolve, reject) => {
        const requestInit = {
            body: formData,
            credentials: 'include',
            method: 'POST',
        } as RequestInit;

        fetch(url , requestInit).then((res) => {
            if (res.ok) {
                resolve(res);
            } else {
                handleGlobalErrorResult(res);
                reject(res);
            }
        });
    });
};

export function put(url: string, data: object) {
    return createRequest(url, 'PUT', data);
}

export function del(url: string, data?: object) {
    return createRequest(url, 'DELETE', data);
}

const handleGlobalErrorResult = (response: Response) => {
    _errorListeners.forEach((listener) => {
        listener(response);
    });
};

const onError = (listener: HttpClientErrorListener) => {
    _errorListeners.push(listener);
};

type HttpClientErrorListener = (response: Response) => void;

export class ProblemDetails {
    static ErrorType = { commandValidation: 'CommandValidation', domain: 'Domain', system: 'System' };

    title: string;
    instance: string;
    type: string;
    status: number;
    detail: string;
    fields?: Array<{ key: string, value: string }>;

    constructor(json: any) {
        this.title = json.title;
        this.instance = json.instance;
        this.type = json.type;
        this.status = json.status;
        this.detail = json.detail;
        this.fields = json.fields || [];
    }
}

export const handleProblemDetails = (pd: ProblemDetails, cb: (message: string) => void) => {
    if (pd.title === ProblemDetails.ErrorType.domain) {
        cb(pd.detail);
    } else if (pd.title === ProblemDetails.ErrorType.commandValidation) {
        pd.fields.forEach((f) => cb(`${f.key}: ${f.value}`));
    } else {
        cb('An error occured');
    }
};

export enum Status {
    Pending = 'pending',
    Ready = 'ready',
    Error = 'error',
}

export default {
    ProblemDetails,
    del,
    get,
    onError,
    post,
    put,
};
