import { query, del, postFormData } from '../../utils/httpClient'

export const getFiles = (): Promise<FileItem[]> => {
    return query(`/admin/api/files`)
        .then(res => res.json());
}

export const uploadFile = (file: File) => {
    const data = new FormData();
    data.append('file', file);
    return postFormData('/admin/api/files/upload', data);
}

export const deleteFile = (key: string) => {
    return del(`/admin/api/files`, { key });
}

export interface FileItem {
    key: string,
    size: number,
    lastModified: string
}