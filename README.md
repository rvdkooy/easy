# easy
Easy Admin SYstem

## Development

requirements:
- windows / mac os / linux
- docker

Start docker containers:
```
cd /path/to/easy

docker-compose up
```

Create local-development.json in /path/to/easy/server/config and fill in your parameters:
```
{
    "DATABASE_CONNECTION_STRING": "mongodb://localhost:27017/<YOUR_DB_NAME>",
    "ROOT_ACCOUNT": "<YOUR_ROOT_EMAIL_ACCOUNT>",
    "SESSION_SECRET": "<RANDOM>",
    "GOOGLE_AUTH": {
        "CLIENT_ID": "<YOUR_GOOGLE_CLIENT_ID>",
        "CLIENT_SECRET": "<YOUR_GOOGLE_CLIENT_SECRET>",
        "CALLBACK_URL": "<YOUR_GOOGLE_CALLBACK_URL>"
    },
    "AWS": {
        "AUTH": {
            "ACCESSKEYID": "accessKey1", // default setting for local docker s3 server
            "SECRETACCESSKEY": "verySecretKey1" // default setting for local docker s3 server
        },
        "S3": {
            "BUCKETNAME": "<YOUR_BUCKET_NAME>",
            "ENDPOINT": "http://127.0.0.1:8000" // default setting for local docker s3 server
        }
    }
}
```

Run dev server:
```
cd /path/to/easy

npm i

npm run dev

// browse to http://localhost:3000
```
