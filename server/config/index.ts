export interface Config {
    DATABASE_CONNECTION_STRING: string,
    ACCOUNTS: ACCOUNT[],
    SESSION_SECRET: string,
    GOOGLE_AUTH: GOOGLE_AUTH,
    AWS: AWS
}

export interface ACCOUNT {
    tenantId: string,
    email: string,
    sites: string[]
}

export interface GOOGLE_AUTH {
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    CALLBACK_URL: string,

}

export interface AWS {
    AUTH: {
        ACCESSKEYID: string,
        SECRETACCESSKEY: string
    },
    S3: {
        BUCKETNAME: string,
        ENDPOINT: string
    }
}
