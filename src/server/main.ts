import express from 'express';
import { Request, Response } from 'express';
import 'dotenv/config'
import routes from '../routes';
import databaseConfig from './database';

const server = express();
server.use(routes);
databaseConfig.initialize().then(() => console.debug('stared database service'));
server.get('/', (req: Request, res: Response): any => res.json({
    message: "Server is started",
    link: `http://localhost:${process.env.SERVER_PORT}`
}));

if (process.env.SERVER_PORT) {
    server.listen(Number.parseInt(process.env.SERVER_PORT));
}
