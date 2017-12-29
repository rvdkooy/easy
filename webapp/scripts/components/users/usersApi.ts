import EditModel from './models/edit';
import ListModel from './models/list';
import { query, post, put, del } from '../../utils/httpClient';

export function getUsers(): Promise<ListModel[]> {
    return query('/api/users')
        .then((res: Response) => res.json()
        .then(json => json.map((x: any) => ListModel.fromJson(x))));
};

export function saveUser(model: EditModel) {
    return post('/api/users', model);
};

export function updateUser(model: EditModel) {
    return put(`/api/users/${model.id}`, model);
};

export function getUser(id: string): Promise<EditModel> {
    return query(`/api/users/${id}`)
        .then((res: Response) => res.json().then(json => EditModel.fromJson(json)));
};

export function deleteUser(id: string) {
    return del(`/api/users/${id}`);
}



