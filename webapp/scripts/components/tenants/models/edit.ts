class EditModel {
    id: string;
    tenantId: string;
    sites: string;
    email: string = '';
    
    isValid() {
        return true;    
    }

    static fromJson(json: any) {
        const editModel = new EditModel();
        editModel.id = json.id;
        editModel.tenantId = json.tenantId;
        editModel.sites = json.sites;
        editModel.email = json.email;
        return editModel;
    }
}

export default EditModel;