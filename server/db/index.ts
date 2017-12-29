import mongoose = require('mongoose'); 
mongoose.Promise = global.Promise;

export const connect = (connectionString: string): mongoose.Connection => {
    mongoose.connection.on('connected', () => {  
        console.log(`Mongoose default connection open to ${connectionString}`);
    }); 

    mongoose.connection.on('error', (err): any => {  
        console.log(`Mongoose default connection error: ${err}`);
    }); 

    mongoose.connection.on('disconnected', () => {  
        console.log('Mongoose default connection disconnected'); 
    });

    process.on('SIGINT', () => {  
        mongoose.connection.close(() => { 
            console.log('Mongoose default connection disconnected through app termination'); 
            process.exit(0); 
        }); 
    }); 

    mongoose.connect(connectionString, {
        useMongoClient: true,
    });
    return mongoose.connection;
};