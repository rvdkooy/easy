import { query } from '../../utils/httpClient'

export const getLogs = (number: number = 0): Promise<LogItem[]> => {
    return query(`/admin/api/logs/latest/${number}`).then(res => res.json());
}

export interface LogItem {
    id: string,
    timestamp: string,
    level: string,
    message: string
}