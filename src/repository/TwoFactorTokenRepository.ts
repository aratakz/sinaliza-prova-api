import {RepositoryInterface} from "./RepositoryInterface";
import {TwoFactorToken} from "../models/entity";
import databaseConfig from '../server/typeorm.conf';


export class TwoFactorTokenRepository implements RepositoryInterface<TwoFactorToken>{
    findById(id: string): Promise<TwoFactorToken> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<TwoFactorToken[]> {
        throw new Error("Method not implemented.");
    }
    async save(entity: TwoFactorToken):Promise<void> {
       await databaseConfig.getRepository(TwoFactorToken).save(entity);
    }
    async findByToken(token: string): Promise<TwoFactorToken[]> {
        return databaseConfig.getRepository(TwoFactorToken).find({
            where: {token},
            relations: {
                user: true
            }
        })
    }

    async remove(token: TwoFactorToken): Promise<void> {
        await databaseConfig.getRepository(TwoFactorToken).remove(token);
    }

}