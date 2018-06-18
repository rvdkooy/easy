import { del, post, put, query } from '../../utils/httpClient';
import EditModel from './models/edit';
import ListModel from './models/list';

export function getTenants(): Promise<ListModel[]> {
    return query('/admin/api/tenants')
        .then((res: Response) => res.json()
        .then((json) => json.map((x: any) => ListModel.fromJson(x))));
}

export function saveTenant(model: EditModel) {
    return post('/admin/api/tenants', model);
}

export function updateTenant(model: EditModel) {
    return put(`/admin/api/tenants/${model.id}`, model);
}

export function getTenant(id: string): Promise<EditModel> {
    return query(`/admin/api/tenants/${id}`)
        .then((res: Response) => res.json().then((json) => EditModel.fromJson(json)));
}

export function deleteTenant(tenantId: string) {
    return del(`/admin/api/tenants/${tenantId}`);
}
