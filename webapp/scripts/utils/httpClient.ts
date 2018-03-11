const checkStatus = (res: Response) => {
    if (res.ok) {
        return res;
    } else {
        const error = new Error(res.statusText || res.status.toString());
        error.message = 'http error';
        throw error;
    }
};

export const query = (url: string) => {
    return fetch(new Request(url),
    {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    // .then(checkStatus); //todo
};

export const postFormData = (url: string, formData: FormData) => {
    return fetch(new Request(url) , {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(checkStatus);
};

export const post = (url: string, data: object) => {
    return fetch(new Request(url) , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    // .then(checkStatus); //todo
};

export function put(url: string, data: object) {
    return fetch(new Request(url), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    // .then(checkStatus); //todo
}

export function del(url: string, data?: object) {
    const requestInit = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    } as RequestInit;

    if (data) {
        requestInit.body = JSON.stringify(data);
    }
    return fetch(new Request(url), requestInit);
    // .then(checkStatus); //todo
}
