import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export class Security {
    async getCredentials(userName: string, password: string) {
        if (process.env.TOKEN_SECRET) {
            return jwt.sign({ id: '' }, process.env.TOKEN_SECRET, {
                expiresIn: '2h'
            });
        }

        throw 'No secret is configured';
    }
}