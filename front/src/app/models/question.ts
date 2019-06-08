import { Category } from './category';

export class Question {
    id: number;
    question: string;
    category: Category;
    answer: string;
    enabled: boolean;
}