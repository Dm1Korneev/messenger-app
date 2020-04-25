# messenger-app

## Develop

1. Install [MongoDB](https://www.mongodb.com/)
2. Install [Node.js](https://nodejs.org)
3. Run `npm install` to install dependencies
4. Start mongo: `npm run start-mongo`
5. Start node server: `npm run start-nodemon`
6. Start front-end: `npm run start-react`

### Enviroment

Create file `.env` with:

    JWT_SECRET=VALUE
    MONGODB_URI=VALUE
    S3_BUCKET=VALUE
    AWS_ACCESS_KEY_ID=VALUE
    AWS_SECRET_ACCESS_KEY=VALUE

Create file `mongod.cfg` [(Docs)](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-options)    