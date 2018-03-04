class ListModel {
    constructor(id: string, tenantId: string, email: string) {
        this.id = id;
        this.tenantId = tenantId;
        this.email = email;
    }
    
    id: string;
    tenantId: string;
    email: string;

    static fromJson(json: any) {
        return new ListModel(json.id, json.tenantId, json.email);
        
    }
}

export default ListModel;