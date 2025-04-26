import { Admin, DataSource } from "typeorm"
import 'dotenv/config'
import { User } from "../models/entity/User";
import { AuthToken } from "../models/entity/AuthToken";
import { Address } from "../models/entity/Address";
import { Student } from "../models/entity/Studant";
import { RegistrationData } from "../models/entity/RegistrationData";
import { Professional } from "../models/entity/Professional";
import { Exam } from "../models/entity/Exam";
import { CourseDetail } from "../models/entity/CourseDetail";
import { Question } from "../models/entity/Question";
import { QuestionOption } from "../models/entity/QuestionOption";
import { Answer } from "../models/entity/Answer";
import { State } from "../models/entity/State";
import { City } from "../models/entity/City";

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
        AuthToken,
        Address,
        Admin,
        Student,
        RegistrationData,
        Professional,
        Exam,
        CourseDetail,
        Question,
        QuestionOption,
        Answer,
        State,
        City
    ],
    synchronize: true
});

export default databaseConfig;


