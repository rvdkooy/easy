class EditModel {
    constructor(id: string) {
        this.id = id;
    }

    id: string;
    tenantId: string;
    sites: string[];
    displayName: string = '';
    email: string = '';
    photo: string = '';

    update(key: string, value: string) {
        if (key === 'id') { this.id = value; }
        if (key === 'displayName') { this.displayName = value; }
    }

    static fromJson(json: any) {
        const editModel = new EditModel(json.id);
        editModel.tenantId = json.tenantId;
        editModel.sites = json.sites;
        editModel.displayName = json.displayName;
        editModel.email = json.email;
        editModel.photo = json.photo;

        return editModel;
    }
}

export default EditModel;
