import { RepositoryInterface } from "../repository/RepositoryInterface";
import { CourseDetail } from "../models/entity/CourseDetail";
import databaseConfig from "../server/typeorm.conf";

export class CourseRepository implements RepositoryInterface<CourseDetail|null> {

    async save(entity: CourseDetail): Promise<void> {
         await databaseConfig.getRepository(CourseDetail).save(entity);
    }

    async findById(id: string): Promise<CourseDetail | null> {
        const course:CourseDetail|null = await databaseConfig.getRepository(CourseDetail).findOneBy({
            id: id,
        });
        if (CourseDetail) {
            return course;
        }
        return null;
    }

    async findAll(): Promise<(CourseDetail | null)[]> {
        throw new Error("Method not implemented.");
    }

}