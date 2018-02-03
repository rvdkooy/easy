
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
const Schema = mongoose.Schema;

export interface IContentPage {
    tenantId: string,
    title: string,
    url: string,
    template: string,
    published: boolean,
    content: string,
    keywords: string,
    description: string
}

export interface IContentPageModel extends IContentPage, mongoose.Document{}

export const contentPageSchema = new Schema({
    tenantId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    template: {
        type: String,
        required: true
    },
    published: Boolean,
    content: String,
    keywords: String,
    description: String,
});

const ContentPageModel = mongoose.model<IContentPageModel>('ContentPage', contentPageSchema);
export default ContentPageModel;

export const findContentPageByUrl = (url: string) => {
    return ContentPageModel.findOne({ url: url}).exec();
};

export const findContentPagesByTenantId = (tenantId: string) => {
    return ContentPageModel.find({ tenantId: tenantId}).exec();
}

export const findContentPageByIdAndTenantId = (tenantId: string, id: string) => {
    const _id = mongoose.Types.ObjectId(id);
    return ContentPageModel.findOne({ _id: _id, tenantId: tenantId }).exec();
};