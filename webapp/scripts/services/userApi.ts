import { get } from '../utils/httpClient';

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
    return get('/admin/api/users/current')
        .catch((err) => {
            if (err.status === 401) {
                return null;
            }
        });
};
