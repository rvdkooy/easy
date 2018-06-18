class ListModel {

    public static fromJson(json: any) {
        return new ListModel(json.id, json.tenantId, json.email);
    }
    public id: string;
    public tenantId: string;
    public email: string;

    constructor(id: string, tenantId: string, email: string) {
        this.id = id;
        this.tenantId = tenantId;
        this.email = email;
    }
}

export default ListModel;
