export default class ListModel {
    constructor(id: string, title: string, url: string, published: boolean) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.published = published;
    }

    id: string;
    title: string;
    url: string;
    published: boolean;

    static fromJson(json: any) {
        return new ListModel(json.id, json.title, json.url, json.published);
    }
}
