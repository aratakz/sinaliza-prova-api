import { DataSource } from "typeorm"
import 'dotenv/config'
import { User } from "../models/User";
import { AuthToken } from "../models/AuthToken";

let DB_PORT = 3306;

if (process.env.MYSQL_DATABASE_PORT) {
    DB_PORT = Number.parseInt(process.env.MYSQL_DATABASE_PORT);
}

const databaseConfig = new DataSource({
    type: "mysql",
    host: "localhost",
    port: DB_PORT,
    username: process.env.MYSQL_DATABASE_USER,
    password: process.env.MYSQL_DATABASE_PASS,
    database: process.env.MYSQL_DATABASE_SCHEMA,
    entities: [
        User, 
        AuthToken
    ],
    synchronize: true
});

export default databaseConfig;


