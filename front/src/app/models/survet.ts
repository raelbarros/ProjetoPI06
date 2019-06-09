import { Student } from './sudent';
import { Category } from './category';

export class Survey {
    id:number;
    date: Date;
    enabled: boolean;
    student: Student;
    category: Category;
}