import {RepositoryInterface} from "./RepositoryInterface";
import {Media} from "../models/entity";
import {Promise} from "mongoose";
import databaseConfig from "../server/typeorm.conf";
import {response} from "express";


export class MediaRepository implements RepositoryInterface<Media>{
    async findAll(): Promise<Array<Media>> {
        return Promise.resolve(undefined);
    }
    async findById(id: string): Promise<Media> {
      const result =
          await databaseConfig.getRepository(Media).find({
              where: {
                  id: id
              }
          });
      return result[0];
    }
    async save(entity: Media): Promise<Media> {
     return await databaseConfig.getRepository(Media).save(entity);
    }
    async findByLink(mediaLink: string) {
        const results =  await databaseConfig.getRepository(Media).find({
            where: {
                link: mediaLink
            }
        });
        return results[0];
    }

    async remove(entity: any) {
        await databaseConfig.getRepository(Media).remove(entity);
    }
}