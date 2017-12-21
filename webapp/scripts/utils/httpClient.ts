export const query = (url: string) => {
    
        return fetch(new Request(url),
        {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
    }
    
    export const post = (url: string, data: object) => {
        return fetch(new Request(url) , { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data) 
        });
    }
    
    export function put (url: string, data: object) {
        return fetch(new Request(url), { 
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data) 
        });
    };
    
    export function del (url: string) {
        return fetch(new Request(url), { 
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });
    };