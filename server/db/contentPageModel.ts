
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IContentPage {
    tenantId: string;
    title: string;
    url: string;
    template: string;
    published: boolean;
    content: string;
    keywords: string;
    description: string;
}

export interface IContentPageModel extends IContentPage, mongoose.Document {}

export const contentPageSchema = new Schema({
    tenantId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    template: {
        type: String,
        required: true,
    },
    published: Boolean,
    content: String,
    keywords: String,
    description: String,
});

let ContentPageModel: mongoose.Model<IContentPageModel>;

if (mongoose.modelNames().find((m) => m === 'ContentPage')) {
    ContentPageModel = mongoose.model<IContentPageModel>('ContentPage');
} else {
    ContentPageModel = mongoose.model<IContentPageModel>('ContentPage', contentPageSchema);
}

export default ContentPageModel;

export const findContentPageByUrl = (tenantId: string, url: string) => {
    return ContentPageModel.findOne({ url, tenantId }).exec();
};

export const findContentPagesByTenantId = (tenantId: string) => {
    return ContentPageModel.find({ tenantId }).exec();
};

export const findContentPageByIdAndTenantId = (tenantId: string, id: string) => {
    const _id = mongoose.Types.ObjectId(id);
    return ContentPageModel.findOne({ _id: id, tenantId }).exec();
};
