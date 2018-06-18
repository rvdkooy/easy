import mongoose = require('mongoose'); 
import { Mockgoose } from 'mockgoose';

mongoose.Promise = global.Promise;

export type MongoConnection = mongoose.Connection;

export const initializeInMemoryMondoDb = async () => {
    const mockgoose = new Mockgoose(mongoose);
    await mockgoose.prepareStorage();
    await mongoose.connect('mongodb://in/memory', { useMongoClient: true });
    return mockgoose;
}


