import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config'
import routes from '../routes';
import databaseConfig from './typeorm.conf';
import mongoConfig from './mogoose.conf';
import cors from 'cors';

const server = express();
Promise.all([
    databaseConfig.initialize(),
]).then(() => {
    console.debug('🔗 Database connections realized');
    server.use(express.json({limit: '50mb'}));
    server.use(cors());
    server.use(routes);
    server.get('/', (req: Request, res: Response): any => res.json({
        message: "Server is started",
        link: `http://localhost:${process.env.SERVER_PORT}`
    }));    
    console.debug('🔀 Server routes configured');

    if (process.env.SERVER_PORT) {
        server.listen(Number.parseInt(process.env.SERVER_PORT));
        console.debug(`📡 Server stared at http://localhost:${process.env.SERVER_PORT}`)
    }
    

});