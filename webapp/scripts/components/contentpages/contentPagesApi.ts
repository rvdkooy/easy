import EditModel from './models/edit';
import ListModel from './models/list';
import { query, post, put, del } from '../../utils/httpClient';

export function getContentPages(): Promise<ListModel[]> {
    return query('/admin/api/contentpages')
        .then((res: Response) => res.json()
        .then(json => json.map((x: any) => ListModel.fromJson(x))));
};

export function saveContentPage(model: EditModel) {
    return post('/admin/api/contentpages', model);
};

// export function updateUser(model: EditModel) {
//     return put(`/admin/api/users/${model.id}`, model);
// };

// export function getUser(id: string): Promise<EditModel> {
//     return query(`/admin/api/users/${id}`)
//         .then((res: Response) => res.json().then(json => EditModel.fromJson(json)));
// };

// export function deleteUser(id: string) {
//     return del(`/admin/api/users/${id}`);
// }



