#!/usr/bin/env node

import * as http from 'http';
import * as path from 'path'; 
import * as fs from 'fs';

let rootDir = __dirname;

if (!fs.existsSync(path.join(rootDir, '../package.json'))) {
    rootDir = path.join(rootDir, '../');
}
console.log(`current rootDir: ${rootDir}`);

process.env["NODE_CONFIG_DIR"] = path.join(rootDir, './config');

import createApp from './app';
import * as config from 'config';  

const settings = {
    DATABASE_CONNECTION_STRING: config.get('DATABASE_CONNECTION_STRING'),
    SESSION_SECRET: config.get('SESSION_SECRET'),
    AWS: config.get("AWS")
};

const app = createApp(settings, rootDir);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
