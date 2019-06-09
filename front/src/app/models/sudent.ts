import { College } from './college';
import { Course } from './course';

export class Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    college: College;
    course: Course;
    periodo: string;
    enabled: boolean;

}