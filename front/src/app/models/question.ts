import { Category } from './category';

export class Question {
    id: number;
    question: string;
    category: Category;
    answer: boolean;
    enabled: boolean;
}