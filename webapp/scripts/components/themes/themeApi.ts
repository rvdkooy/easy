import { get, postFormData } from '../../utils/httpClient';

export const getLatestTheme = (tenantId: string) => {
    return get(`/admin/api/${tenantId}/theme`);
};

export const uploadTheme = (tenantId: string, theme: File) => {
    const data = new FormData();
    data.append('file', theme);
    return postFormData(`/admin/api/${tenantId}/theme`, data);
};
