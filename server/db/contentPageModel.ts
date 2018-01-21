
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IContentPage {
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
