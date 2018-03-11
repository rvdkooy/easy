export interface Config {
    DATABASE_CONNECTION_STRING: string;
    ROOT_ACCOUNT: string;
    SESSION_SECRET: string;
    GOOGLE_AUTH: GOOGLE_AUTH;
    AWS: AWS;
}

export interface GOOGLE_AUTH {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CALLBACK_URL: string;

}

export interface AWS {
    AUTH: {
        ACCESSKEYID: string,
        SECRETACCESSKEY: string,
    };
    S3: {
        BUCKETNAME: string,
        ENDPOINT: string,
    };
}
