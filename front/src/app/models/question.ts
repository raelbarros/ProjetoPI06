import { Category } from './category';

export class Question {
    id: number;
    question: string;
    category: Category;
    enabled: boolean;
}