import * as mongoose from 'mongoose';

class Querstoin {
    id: string;
    title: string;
}


const questionSchema = new mongoose.Schema(Querstoin);

export default questionSchema;