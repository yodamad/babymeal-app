/**
 * Created by mvincent on 31/10/2015.
 */
import {collections} from './externals/collections';
import {Masterdata} from './masterdata';

export class Bibber {
    public milktypes: collections.LinkedList<Masterdata> = new collections.LinkedList<Masterdata>();
    public quantity: number;
    public garnish: Masterdata;
}

export class Food {
    public elements: collections.LinkedList<Masterdata> = new collections.LinkedList<Masterdata>();
}

export class Meal {
    public mealdate: string;
    public mealtime: string;
    public bibber: Bibber = new Bibber;
    public food: Food = new Food;
    public drugs: collections.LinkedDictionary<Masterdata, number> = new collections.LinkedDictionary<Masterdata, number>();
}