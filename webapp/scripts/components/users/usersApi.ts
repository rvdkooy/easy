import { del, post, put, query } from '../../utils/httpClient';
import EditModel from './models/edit';
import ListModel from './models/list';

export function getUsers(): Promise<ListModel[]> {
    return query('/admin/api/users')
        .then((res: Response) => res.json()
        .then((json) => json.map((x: any) => ListModel.fromJson(x))));
}

export function saveUser(model: EditModel) {
    return post('/admin/api/users', model);
}

export function updateUser(model: EditModel) {
    return put(`/admin/api/users/${model.id}`, model);
}

export function getUser(id: string): Promise<EditModel> {
    return query(`/admin/api/users/${id}`)
        .then((res: Response) => res.json().then((json) => EditModel.fromJson(json)));
}

export function deleteUser(id: string) {
    return del(`/admin/api/users/${id}`);
}
