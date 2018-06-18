import { query } from '../utils/httpClient';

export interface User {
    tenants: Tenant[];
    displayName: string;
    photo: string;
    rootAccount: boolean;
}

export interface Tenant {
    tenantId: string;
    site: string;
}

export const retrieveCurrentUser = (): Promise<User> => {
    return query('/admin/api/users/current')
        .then((res: Response) => {
            if (res.status === 401) {
                return null;
            }
            return res.json();
        });
};
