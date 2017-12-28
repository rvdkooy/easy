import { query } from '../utils/httpClient';

export interface User {
    displayName: string;
    photo: string;
}

export const retrieveCurrentUser = (): Promise<User> => {
    return query('/api/users/current')
        .then((res: Response) => {
            if (res.status === 401) {
                return null;
            }
            return res.json();
        }); 
};
