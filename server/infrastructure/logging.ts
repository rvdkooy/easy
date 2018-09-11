import * as express from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import 'winston-mongodb';

// declare module 'winston' {
//     interface MongoDBTransportInstance extends TransportInstance {}
//     interface Transports {
//         MongoDB: MongoDBTransportInstance;
//     }
// }

export const setupLogger = (app: express.Express, connectionString: string ) => {
    const inProduction = process.env.NODE_ENV === 'production';

    const logsDir = path.resolve(__dirname, '../logs');

    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    const generalLogger = new winston.Logger({
        exitOnError: true,
    });
    generalLogger.add(winston.transports.MongoDB, {
        db: connectionString,
        level: 'info',
    });

    const httpLogger = new winston.Logger({
        exitOnError: true,
    });

    if (inProduction) {
        generalLogger.add(winston.transports.DailyRotateFile, {
            name: 'general file logger',
            filename: '_general_.log',
            datePattern: 'yyyy-MM-dd',
            prepend: true,
            level: inProduction ? 'info' : 'debug',
            dirname: logsDir,
        });

        httpLogger.add(winston.transports.DailyRotateFile, {
            name: 'http file logger',
            filename: '_http_.log',
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: 'info',
            dirname: logsDir,
        });

    } else {
        generalLogger.add(winston.transports.Console, {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        });

        httpLogger.add(winston.transports.Console, {
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,

        });
    }

    const winstonStreamWriter = {
        write: (message: string) => {
            httpLogger.info(message.trim());
        },
    };

    if (inProduction) {
        app.use(morgan('common', { stream: winstonStreamWriter }));
    } else {
        app.use(morgan('dev',  { stream: winstonStreamWriter }));
    }

    return generalLogger;
};
