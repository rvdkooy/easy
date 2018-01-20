import { query } from '../../utils/httpClient'

export const getFiles = (): Promise<FileItem[]> => {
    return query(`/admin/api/files`)
        .then(res => res.json());
}

export const uploadFile = () => {
    
}

export interface FileItem {
    key: string,
    size: number,
    lastModified: string
}