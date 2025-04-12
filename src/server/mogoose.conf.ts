import * as mongoose from 'mongoose';
import 'dotenv/config';


class MongoDbConfig {

private readonly MONGO_HOST = 'mongodb://';

    async init() {
        if (!process.env.MONGODB_SECURITY) {
            throw new Error('NO MONGO SECURITY MODE DEFINED!');
        }
        if (JSON.parse(process.env.MONGODB_SECURITY) == false) {
            mongoose.connect(`${this.MONGO_HOST}${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_SCHEMA}`);
        } else {
            mongoose.connect(`${this.MONGO_HOST}${process.env.MONGODB_USER}:${process.env.MONGOB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_SCHEMA}`);

        } 
    }
}

const mongoConfig =  new MongoDbConfig();

export default mongoConfig;