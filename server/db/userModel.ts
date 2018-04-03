
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IUser {
    displayName: string;
    email: string;
    gender: string;
    photo: string;
    provider: {
        id: string,
        name: string,
    };
}

export interface IUserModel extends IUser, mongoose.Document { }

export const userSchema = new Schema({
    displayName: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    photo : String,
    provider: {
        id: String,
        name: String,
    },
});

let UserModel: mongoose.Model<IUserModel>;

if (mongoose.modelNames().find((m) => m === 'UserModel')) {
    UserModel = mongoose.model<IUserModel>('UserModel');
} else {
    UserModel = mongoose.model<IUserModel>('UserModel', userSchema);
}

export default UserModel;

export const findByEmail = (email: string) => {
    return UserModel.findOne({ email }).exec();
};
