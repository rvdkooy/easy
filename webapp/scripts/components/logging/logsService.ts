import { query } from '../../utils/httpClient';

export const getLogs = (nr: number = 0): Promise<LogItem[]> => {
    return query(`/admin/api/logs/latest/${nr}`).then((res) => res.json());
};

export interface LogItem {
    id: string;
    timestamp: string;
    level: string;
    message: string;
}
