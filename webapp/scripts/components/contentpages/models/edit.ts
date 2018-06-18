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
    title: string;
    url: string;
    published: boolean;
    content: string;
    keywords: string;
    description: string;

    update(key: string, value: any) {
        switch (key) {
            case 'title':
                this.title = value;
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
            case 'keywords':
                this.keywords = value;
                break;
            case 'description':
                this.description = value;
                break;
        }
    }

    isValid() {
        return !!this.id && !!this.title && !!this.url;
    }

    static fromJson(json: any) {
        const result = new EditModel(json.id);
        result.title = json.title;
        result.url = json.url;
        result.content = json.content;
        result.published = json.published;
        result.keywords = json.keywords;
        result.description = json.description;
        return result;
    }
}
