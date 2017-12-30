export default class ListModel {
    constructor(id: string, name: string, url: string, published: boolean) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.published = published;
    }

    id: string;
    name: string;
    url: string;
    published: boolean;

    static fromJson(json: any) {
        return new ListModel(json.id, json.name, json.url, json.published);
    }
}