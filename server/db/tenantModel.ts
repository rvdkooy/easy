import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ITenant {
    tenantId: string;
    email: string;
    sites: string[];
}

export interface ITenantModel extends ITenant, mongoose.Document {}

export const tenantSchema = new Schema({
    tenantId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    sites: {
        type: [String],
        required: true,
    },
});

let TenantModel: mongoose.Model<ITenantModel>;

if (mongoose.modelNames().find((m) => m === 'Tenant')) {
    TenantModel = mongoose.model<ITenantModel>('Tenant');
} else {
    TenantModel = mongoose.model<ITenantModel>('Tenant', tenantSchema);
}

export const findTenantsByEmail = (email: string): Promise<ITenantModel[]> => {
    return TenantModel.find({ email }).exec();
};

export const findTenantBySite = (host: string) => {
    return TenantModel.findOne({ sites: host }).exec();
};

export const findAllTenants = (): Promise<ITenantModel[]> => {
    return TenantModel.find().exec();
};

export default TenantModel;
