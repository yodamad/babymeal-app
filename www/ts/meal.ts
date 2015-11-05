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

export class JsonBibber {
    public milks: Array<Masterdata> = new Array<Masterdata>();
    public quantity: number;
    public garnish: Masterdata;
}

export class Food {
    public elements: collections.LinkedList<Masterdata> = new collections.LinkedList<Masterdata>();
}

class JsonFood {
    public elements: Array<Masterdata> = new Array<Masterdata>();
}


export class DrugInfo {
    public drugType: Masterdata;
    public quantity: number;
}

class JsonMeal {
    public date: string;
    public time: string;
    public bibber: JsonBibber = new JsonBibber;
    public food: JsonFood = new JsonFood;
    public drugs: Array<DrugInfo> = new Array<DrugInfo>();

}

export class Meal {
    public mealdate: string;
    public mealtime: string;
    public bibber: Bibber = new Bibber;
    public food: Food = new Food;
    public drugs: collections.Dictionary<Masterdata, number> = new collections.Dictionary<Masterdata, number>((key: Masterdata) => key.toString());
    public drugsInfo: collections.LinkedList<DrugInfo> = new collections.LinkedList<DrugInfo>();

    prepareForPost(): string {
        var cleanMeal: JsonMeal = new JsonMeal();
        cleanMeal.date = this.mealdate;
        cleanMeal.time = this.mealtime;

        var cleanBibber: JsonBibber = new JsonBibber();
        cleanBibber.quantity = this.bibber.quantity;
        cleanBibber.milks = this.bibber.milktypes.toArray();
        cleanBibber.garnish = this.bibber.garnish;
        cleanMeal.bibber = cleanBibber;

        var cleanFood: JsonFood = new JsonFood();
        cleanMeal.food = cleanFood;

        var info: Array<DrugInfo> = new Array<DrugInfo>();
        this.drugs.forEach((key: Masterdata, value: number) => {
            var druginfo: DrugInfo = new DrugInfo();
            druginfo.drugType = key;
            druginfo.quantity = value;
            console.log('Convert to drugInfo : ' + druginfo.drugType + ', ' + druginfo.quantity);
            info.push(druginfo);
        })
        console.log('Drugs info : ' + info);
        cleanMeal.drugs = info;
        return JSON.stringify(cleanMeal);
    }
}