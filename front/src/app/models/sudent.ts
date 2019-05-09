import { College } from './college';
import { Course } from './course';

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    college: College;
    course: Course;
    periodo: string;
    enabled: boolean;

}