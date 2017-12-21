import { query } from '../utils/httpClient';

export interface User {
    displayName: string;
    photo: string;
}

export const retrieveCurrentUser = (): Promise<User> => {
    return query('/api/users/current')
                .then((res: any) => res.json()); 
};
