import * as uuid from 'uuid';

export default class EditModel {
    constructor(id?: string) {
        if (!id) {
            this.id = uuid.v4();
        } else {
            this.id = id;
        }
    }

    id: string;
    name: string;
    url: string;
    published: boolean;
    content: string;

    update(key: string, value: any) {
        switch (key) {
            case 'name':
                this.name = value;
                break;
            case 'url':
                this.url = value;
                break;
            case 'content':
                this.content = value;
                break;
            case 'published':
                this.published = value;
                break;
        }
    }

    isValid() {
        return !!this.id && !!this.name && !!this.url;
    }

    static fromJson(json: any) {
        const result = new EditModel(json.id);
        result.name = json.name;
        result.url = json.url;
        result.content = json.content;
        result.published = json.published;
        return result;
    }
}