
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IUser {
    tenantId: string,
    sites: string[],
    displayName: string,
    email: string,
    gender: string,
    photo: string,
    provider: {
        id: string,
        name: string
    }
}

export interface UserModel extends IUser, mongoose.Document{}

export const userSchema = new Schema({
    tenantId: {
        type: String,
        required: true
    },
    sites: {
        type: [String],
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    photo : String,
    provider: {
        id: String,
        name: String
    },
});

let UserModel: mongoose.Model<UserModel>;

if (mongoose.modelNames().find(m => m === 'UserModel')) {
    UserModel = mongoose.model<UserModel>('UserModel');
} else {
    UserModel = mongoose.model<UserModel>('UserModel', userSchema);
}

export default UserModel;

export const findByEmail = (email: string) => {
    return UserModel.findOne({ email: email}).exec();
};
