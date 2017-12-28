
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IUser {
    displayName: string,
    email: string,
    gender: string,
    photo: string,
    provider: {
        id: string,
        name: string
    }
}

export interface IUserModel extends IUser, mongoose.Document{}

export const userSchema = new Schema({
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

const UserModel = mongoose.model<IUserModel>('User', userSchema);
export default UserModel;

export const findByEmail = (email: string) => {
    return UserModel.findOne({ email: email}).exec();
};

// google profile:
        // id: '107930634086143942122',
        // displayName: 'Ronald van der Kooij',
        // name: { familyName: 'van der Kooij', givenName: 'Ronald' },
        // emails: [ { value: 'ronaldvdkooy@gmail.com', type: 'account' } ],
        // photos: [ { value: 'https://lh5.googleusercontent.com/-iIphJSrEgWc/AAAAAAAAAAI/AAAAAAAABhg/89vkQSwsTYM/photo.jpg?sz=50' } ],
        // gender: 'male',
        // provider: 'google',