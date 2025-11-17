import { AuthToken } from '../models/entity/AuthToken';
import { RepositoryInterface } from './RepositoryInterface';
import databaseConfig from '../server/typeorm.conf';
import { User } from '../models/entity/User';
import {Professional} from "../models/entity";


export class AuthTokenRepository implements RepositoryInterface<AuthToken>{
    
    findById(id: string): Promise<AuthToken> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<AuthToken[]> {
        throw new Error('Method not implemented.');
    }
    async save(entity: AuthToken): Promise<AuthToken> {
        return await databaseConfig.getRepository(AuthToken).save(entity);
    }

    async findLastByUserId(user: User) {
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
    }
    async findLastByProfessionalId(professional: Professional) {
        const tokens = await databaseConfig.getRepository(AuthToken).find({
            where: {
                user: {
                    id: professional.id
                },
            },
            order: {
                generated: 'DESC'
            }
        });
        return tokens[0];
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