import { del, post, put, query } from '../../utils/httpClient';
import EditModel from './models/edit';
import ListModel from './models/list';

export function getContentPages(tenantId: string): Promise<ListModel[]> {
    return query(`/admin/api/${tenantId}/contentpages`)
        .then((res: Response) => res.json()
        .then((json) => json.map((x: any) => ListModel.fromJson(x))));
}

export function saveContentPage(tenantId: string, model: EditModel) {
    return post(`/admin/api/${tenantId}/contentpages`, model);
}

export function updateContentPage(tenantId: string, model: EditModel) {
    return put(`/admin/api/${tenantId}/contentpages/${model.id}`, model);
}

export function getContentPage(tenantId: string, id: string): Promise<EditModel> {
    return query(`/admin/api/${tenantId}/contentpages/${id}`)
        .then((res: Response) => res.json().then((json) => EditModel.fromJson(json)));
}

export function deleteContentPage(tenantId: string, id: string) {
    return del(`/admin/api/${tenantId}/contentpages/${id}`);
}
