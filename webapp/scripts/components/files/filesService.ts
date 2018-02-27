import { query, del, postFormData } from '../../utils/httpClient'

export const getFiles = (tenantId: string): Promise<FileItem[]> => {
    return query(`/admin/api/${tenantId}/files`)
        .then(res => res.json());
}

export const uploadFile = (tenantId: string, file: File) => {
    const data = new FormData();
    data.append('file', file);
    return postFormData(`/admin/api/${tenantId}/files/upload`, data);
}

export const deleteFile = (tenantId: string, key: string) => {
    return del(`/admin/api/${tenantId}/files`, { key });
}

export interface FileItem {
    key: string,
    size: number,
    lastModified: string
}