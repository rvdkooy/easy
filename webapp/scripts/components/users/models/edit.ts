class EditModel {
    constructor(id: string) {
        this.id = id;
    }
    
    id: string;
    displayName: string = '';
    email: string = '';
    photo: string = '';

    update(key: string, value: string) {
        if (key === 'id') this.id = value;
        if (key === 'displayName') this.displayName = value;
    }

    static fromJson(json: any) {
        const editModel = new EditModel(json.id);
        editModel.displayName = json.displayName;
        editModel.email = json.email;
        editModel.photo = json.photo;
        
        return editModel;
    }
}

export default EditModel;