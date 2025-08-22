import { CourseDetail } from "../models/entity/CourseDetail";
import { CourseRepository } from "../repository/CourseDetailRepository";

type Course = {
    courseName: string,
    description: string
}

export class CourseDomain {

    private courseRepository;

    constructor() {
        this.courseRepository = new CourseRepository();
    }

    async create(CourseMetadata: Course) {
        const Course = new CourseDetail;
        Course.courseName = CourseMetadata.courseName;
        Course.description = CourseMetadata.description;
    }

    async update(course: CourseDetail, courseData: Course) {
        course.courseName = courseData.courseName;
        course.description = courseData.description;
    }
    
}