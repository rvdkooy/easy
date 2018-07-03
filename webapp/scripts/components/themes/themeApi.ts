import { get } from '../../utils/httpClient';

export const getLatestTheme = (tenantId: string) => {
    return get(`/admin/api/${tenantId}/theme`);
};

// export const uploadTheme = () => {
//     return null;
// };
