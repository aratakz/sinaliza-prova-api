import { AuthToken } from '../models/entity/AuthToken';
import { RepositoryInterface } from './RepositoryInterface';
import databaseConfig from '../server/typeorm.conf';
import { User } from '../models/entity/User';


export class AuthTokenRepository implements RepositoryInterface<AuthToken>{
    
    findById(id: string): Promise<AuthToken> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<AuthToken[]> {
        throw new Error('Method not implemented.');
    }
    async save(entity: AuthToken): Promise<void> {
        try{
        await databaseConfig.getRepository(AuthToken).save(entity);
        } catch (error){
            console.log("ERRO: " + error);
        }
    }

    async findLastByUserId(user: User) {
        try{
            const tokens = await databaseConfig.getRepository(AuthToken).find({
            where: {
                user: {
                    id: user.id
                },
            },
            order: {
                generated: 'DESC'
            }
        });
        return tokens[0];

        } catch (error) {
            console.log("ERRO: " + error);
            return;
        }
    }

    async findToken(token: string) {
        const tokens = await databaseConfig.getRepository(AuthToken).find({
            where: {
                token: token,
            },
            relations: {
                user: {
                    institute: true
                }
            }
        });
        return tokens[0];
    }

    async removeToken(token: AuthToken) {
        const tokens = await databaseConfig.getRepository(AuthToken).remove(token);
    }
    
}