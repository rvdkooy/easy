import * as uuid from 'uuid';

export default class EditModel {
    constructor(id?: string) {
        if (!id) {
            this.id = uuid.v4();
        }
    }

    id: string;
    name: string;
    url: string;
    published: boolean;
    content: string;

    update(key: string, value: any) {
        console.log(key, value);
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

    }
}