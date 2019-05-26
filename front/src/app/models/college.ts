import { City } from './city';
import { State } from './state';

export class College {
    id: number;
    name: string;
    tipo: string;
    enabled: boolean;
    city: City;
    state: State;

}