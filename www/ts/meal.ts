/**
 * Created by mvincent on 31/10/2015.
 */
import {collections} from './externals/collections';
import {Masterdata} from './masterdata';
import {Constants} from './constants';

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
    public aliments: collections.LinkedList<Aliment> = new collections.LinkedList<Aliment>();
}

export class JsonFood {
    public aliments: Array<JsonAliment> = new Array<JsonAliment>();
}

export class Aliment {
    public type: Masterdata;
    public quantity: number;
    public tasts: collections.LinkedList<Masterdata> = new collections.LinkedList<Masterdata>();

    toString() {
        return 'Aliment_' + this.type.label + '_' + this.tasts.size();
    }
}

export class JsonAliment {
    public type: Masterdata;
    public quantity: number;
    public tasts: Array<Masterdata> = new Array<Masterdata>();
}

export class DrugInfo {
    public drugType: Masterdata;
    public quantity: number = 0;
}

export class JsonMeal {
    public id: string;
    public date: string;
    public time: string;
    public bibber: JsonBibber = new JsonBibber;
    public food: JsonFood = new JsonFood;
    public drugs: Array<DrugInfo> = new Array<DrugInfo>();
    public comments;
    public withRegurgitation:boolean;

    static convertToTypescript(jsonMeal: JsonMeal): Meal {
        console.log('Converting meal to ts...');
        var meal: Meal = new Meal();
        meal.mealdate = jsonMeal.date;
        meal.mealtime = jsonMeal.time;

        var tsBibber: Bibber = new Bibber();
        tsBibber.quantity = jsonMeal.bibber.quantity;
        tsBibber.milktypes = new collections.LinkedList<Masterdata>();

        for (var milk in jsonMeal.bibber.milks) {
            tsBibber.milktypes.add(jsonMeal.bibber.milks[milk]);
        }
        tsBibber.garnish = jsonMeal.bibber.garnish;
        tsBibber.quantity = jsonMeal.bibber.quantity;
        meal.bibber = tsBibber;

        var tsFood: Food = new Food();
        tsFood.aliments = new collections.LinkedList<Aliment>();
        for (var aliment in jsonMeal.food.aliments) {
            var tsAliment = new Aliment();
            tsAliment.quantity = jsonMeal.food.aliments[aliment].quantity;
            tsAliment.type = jsonMeal.food.aliments[aliment].type;
            tsAliment.tasts = new collections.LinkedList<Masterdata>();
            for (var tast in jsonMeal.food.aliments[aliment].tasts) {
                tsAliment.tasts.add(jsonMeal.food.aliments[aliment].tasts[tast]);
            }
            tsFood.aliments.add(tsAliment);
        }
        meal.food = tsFood;

        var tsDrugs = new collections.Dictionary<Masterdata, number>((key: Masterdata) => key.type + '_' + key.label + '_' + key.additionalData);
        for (var drug in jsonMeal.drugs) {
            var tmpDrug: DrugInfo =  this.cloneDrugInfo(jsonMeal.drugs[drug]);
            tsDrugs.setValue(tmpDrug.drugType, tmpDrug.quantity)
        }
        meal.drugs = tsDrugs;

        meal.regurgitation = jsonMeal.withRegurgitation;
        meal.comments = jsonMeal.comments;
        console.log('Conversion meal to ts ok...')
        return meal;
    }

    private static cloneDrugInfo(di: DrugInfo): DrugInfo {
        var tmp: DrugInfo = new DrugInfo();
        tmp.quantity = +di.quantity;
        tmp.drugType = Masterdata.cloneMasterdata(di.drugType);
        return tmp;
    }
}

export class Meal {
    public mealdate: string = Constants.printDate();
    public mealtime: string = Constants.printTime();
    public bibber: Bibber = new Bibber;
    public food: Food = new Food;
    public drugs: collections.Dictionary<Masterdata, number> =
        new collections.Dictionary<Masterdata, number>((key: Masterdata) => key.type + '_' + key.label + '_' + key.additionalData);
    public drugsInfo: collections.LinkedList<DrugInfo> = new collections.LinkedList<DrugInfo>();
    public comments;
    public regurgitation:boolean = false;

    prepareForPost(mealid:string): string {
        var cleanMeal: JsonMeal = new JsonMeal();
        if (mealid) {
            cleanMeal.id = mealid;
        }
        cleanMeal.date = this.mealdate;
        cleanMeal.time = this.mealtime;

        var cleanBibber: JsonBibber = new JsonBibber();
        cleanBibber.quantity = this.bibber.quantity;
        cleanBibber.milks = this.bibber.milktypes.toArray();
        cleanBibber.garnish = this.bibber.garnish;
        cleanMeal.bibber = cleanBibber;

        var cleanFood: JsonFood = new JsonFood();
        this.food.aliments.forEach((element: Aliment): boolean => {
            var tmpAliment: JsonAliment = new JsonAliment;
            tmpAliment.type = element.type;
            tmpAliment.quantity = element.quantity;
            tmpAliment.tasts = element.tasts.toArray();
            cleanFood.aliments.push(tmpAliment);
            return true;
        });
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

        cleanMeal.withRegurgitation = this.regurgitation;
        cleanMeal.comments = this.comments;

        return JSON.stringify(cleanMeal);
    }
}