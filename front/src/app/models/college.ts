import { City } from './city';
import { State } from './State';

export class College {
    id: number;
    name: string;
    tipo: string;
    enabled: boolean;
    city: City;
    state: State;

}