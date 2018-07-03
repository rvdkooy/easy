import { get } from '../../utils/httpClient';

export const getLogs = (nr: number = 0): Promise<LogItem[]> => {
    return get(`/admin/api/logs/latest/${nr}`);
};

export interface LogItem {
    id: string;
    timestamp: string;
    level: string;
    message: string;
}
