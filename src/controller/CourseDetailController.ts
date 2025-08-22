import { CourseDomain } from '../domain/Course';
import { CourseRepository } from '../repository/CourseDetailRepository';
import { Request, Response } from 'express';

class CourseDetailController{

    async index(request: Request, response: Response): Promise<any> {
        response.json('course routes');
    }

    async getCourseInfo(request: Request, response: Response){
        if (!request.params || !request.params.courseId) {
            response.status(422).json({ message: 'No course id is provided!' })
        }
        
        const course = await new CourseRepository().findById(request.params.courseId);
        
            if (!course) {
                response.status(404).json({ message: 'Course not found!' });
            }
            if (course) {
                response.json({
                    course: {
                        id: course?.id,
                        courseName: course?.courseName,
                        description: course?.description
                    }
                });
            }
    }
    
    async update(request: Request, response: Response) {
        if (!request.params || !request.params.courseId) {
            response.status(422).json({ message: 'No course id is provided!' });
        }
        if (!request.body) {
            response.status(422).json({ message: 'No course id is provided!' });
        }

        const course = await new CourseRepository().findById(request.params.courseId);

        if (course != null) {
            new CourseDomain().update(course, request.body)

        } else {
            response.status(404).json({ message: 'Course not found!'})
        }
        
    }

} export default new CourseDetailController();