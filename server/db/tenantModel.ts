import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const Schema = mongoose.Schema;

export interface ITenant {
    tenantId: string,
    email: string,
    sites: string[]
}

export interface ITenantModel extends ITenant, mongoose.Document{}

export const tenantSchema = new Schema({
    tenantId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sites: {
        type: [String],
        required: true
    }
});

let TenantModel: mongoose.Model<ITenantModel>;

if (mongoose.modelNames().find(m => m === 'Tenant')) {
    TenantModel = mongoose.model<ITenantModel>('Tenant');
} else {
    TenantModel = mongoose.model<ITenantModel>('Tenant', tenantSchema);
}

export const findTenantByEmail = (email: string) => {
    return TenantModel.findOne({ email: email }).exec();
};

export default TenantModel;