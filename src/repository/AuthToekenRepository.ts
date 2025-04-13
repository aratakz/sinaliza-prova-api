import { AuthToken } from '../models/entity/AuthToken';
import { RepositoryInterface } from './RepositoryInterface';
import databaseConfig from '../server/typeorm.conf';


export class AuthTokenRepository implements RepositoryInterface<AuthToken>{
    
    findById(id: string): Promise<AuthToken> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<AuthToken[]> {
        throw new Error('Method not implemented.');
    }
    async save(entity: AuthToken): Promise<void> {
      await databaseConfig.getRepository(AuthToken).save(entity);
    }
    
}