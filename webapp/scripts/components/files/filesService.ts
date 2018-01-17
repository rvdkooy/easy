import { query } from '../../utils/httpClient'

export const getFiles = (): Promise<FileItem[]> => {
    return query(`/admin/api/files`).then(res => res.json());
}

export interface FileItem {
    key: string,
    size: number,
    lastModified: string
}