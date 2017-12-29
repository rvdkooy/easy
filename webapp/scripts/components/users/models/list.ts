class ListModel {
    constructor(id: string) {
        this.id = id;
    }
    
    id: string;
    email: string;
    displayName: string;
    photo: string;
    
    static fromJson(json: any) {
        const model = new ListModel(json.id);
        model.email = json.email;
        model.displayName = json.displayName;
        model.photo = json.photo;
        return model;
    }
}

export default ListModel;