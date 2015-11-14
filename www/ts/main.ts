///<reference path="../node_modules/angular2/router.d.ts"/>
///<reference path="masterdata.ts"/>
/**
 * Created by mvincent on 24/10/2015.
 */
import {Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {RouteParams} from 'angular2/router';
import {Masterdata} from './masterdata';
import {JsonMeal, Meal, Aliment, DrugInfo} from './meal';
import {Constants} from './constants';
import {collections} from './externals/collections';

@Component({
    selector: 'bibber',
    viewProviders: HTTP_PROVIDERS
})
@View({
    templateUrl: './templates/bibber.html',
    styleUrls: ['./css/babymeal.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class AppComponent {
    public vegetables:Array<Masterdata>;
    public fruits:Array<Masterdata>;
    public drugs:Array<Masterdata>;
    public milktypes:Array<Masterdata>;
    public mealtypes:Array<Masterdata>;
    public garnishes:Array<Masterdata>;

    constructor(public http:Http) {
        if (localStorage.getItem("mealid")) {
            var jsonMeal:JsonMeal = new JsonMeal();
            this.getMeal(localStorage.getItem("mealid")).then(receivedMeal => {
                console.log('meal received from server : ' + receivedMeal);
                jsonMeal = receivedMeal;
                this.meal = JsonMeal.convertToTypescript(jsonMeal);
            });
        }
        this.getFruits();
        this.getVegetables();
        this.getDrugs();
        this.getGarnishes();
        this.getMealTypes();
        this.getMilkTypes();
    }

    public getVegetables() {
        this.http.get(Constants.VEGETABLES_URL)
            .map(res => res.json())
            .subscribe(
                data => this.vegetables = data._embedded.masterdata,
                err => console.log('Impossible to retrieve vegetables'),
                () => console.log('Loaded vegetables')
            );
    }

    public getFruits() {
        this.http.get(Constants.FRUITS_URL)
            .map(res => res.json())
            .subscribe(
                data => this.fruits = data._embedded.masterdata,
                err => console.log('Impossible to retrieve fruits'),
                () => console.log('Loaded fruits')
            );
    }

    public getDrugs() {
        this.http.get(Constants.DRUGS_URL)
            .map(res => res.json())
            .subscribe(
                data => this.drugs = data._embedded.masterdata,
                err => console.log('Impossible to retrieve drugs'),
                () => console.log('Loaded drugs')
            );
    }

    public getGarnishes() {
        this.http.get(Constants.GARNISHES_URL)
            .map(res => res.json())
            .subscribe(
                data => this.garnishes = data._embedded.masterdata,
                err => console.log('Impossible to retrieve garnishes'),
                () => console.log('Loaded garnishes')
            );
    }

    public getMealTypes() {
        this.http.get(Constants.MEALTYPES_URL)
            .map(res => res.json())
            .subscribe(
                data => this.mealtypes = data._embedded.masterdata,
                err => console.log('Impossible to retrieve mealtypes'),
                () => console.log('Loaded mealtypes')
            );
    }

    public getMilkTypes() {
        this.http.get(Constants.MILKTYPES_URL)
            .map(res => res.json())
            .subscribe(
                data => this.milktypes = data._embedded.masterdata,
                err => console.log('Impossible to retrieve milktypes'),
                () => console.log('Loaded milktypes')
            );
    }

    // Form elements
    meal:Meal = new Meal;

    getMeal(mealid:string) {
        console.log('Loading meal ' + mealid);
        var jsonmeal:JsonMeal = new JsonMeal();
        return this.http.get(Constants.MEAL_URL + '/' + mealid)
            .map(res => res.json())
            .delay(1000)
            .toPromise();
    };

    updateMeal(md:Masterdata) {
        if (md.type == Constants.MILKTYPE) {
            AppComponent.updateList(this.meal.bibber.milktypes, md);
        } else if (md.type == Constants.GARNISH) {
            if (this.meal.bibber.garnish && this.meal.bibber.garnish.label == md.label) {
                console.log('Garnish already set');
                this.meal.bibber.garnish = null;
            } else {
                console.log('Set garnish to ' + md.label);
                this.meal.bibber.garnish = md;
            }
        } else if (md.type == Constants.MEALTYPE) {
            var found:boolean = false;
            if (this.meal.food.aliments.size() > 0) {
                console.log('Current aliments : ' + this.meal.food.aliments);
                this.meal.food.aliments.forEach((aliment:Aliment) => {
                    //console.log('Check aliment ' + aliment)
                    if (aliment.type.label == md.label) {
                        console.log('Remove aliment to meal : ' + aliment.type.label);
                        this.meal.food.aliments.removeElementAtIndex(this.meal.food.aliments.indexOf(aliment));
                        found = true;
                    }
                    return true;
                });
            }
            if (!found) {
                var newAliment:Aliment = new Aliment;
                newAliment.type = md;
                this.meal.food.aliments.add(newAliment)
                console.log('Add aliment to meal : ' + newAliment.type.label);
                console.log('Updated aliments : ' + this.meal.food.aliments);
            }
        } else if (md.type == Constants.DRUG) {
            var tmpMd:Masterdata = Masterdata.cloneMasterdata(md);
            if (this.hasDrug(md)) {
                console.log('Remove drug' + tmpMd.label);
                this.meal.drugs.remove(tmpMd);
            } else {
                console.log('Add drug' + tmpMd.label);
                this.meal.drugs.setValue(tmpMd, 1);
            }
        }
    }

    updateAliment(mealtype:Masterdata, tast:Masterdata) {
        this.meal.food.aliments.forEach((aliment:Aliment) => {
            if (aliment.type.label == mealtype.label) {
                if (!aliment.tasts.contains(tast, AppComponent.equalsMasterdata)) {
                    console.log('Add tast ' + tast.label + ' to ' + aliment.type.label);
                    aliment.tasts.add(tast);
                } else {
                    console.log('Remove tast ' + tast.label + ' to ' + aliment.type.label);
                    aliment.tasts.remove(tast, AppComponent.equalsMasterdata);
                }
            }
            return true;
        });
    }

    static equalsMasterdata = function (md1:Masterdata, md2:Masterdata):boolean {
        if (!md1) {
            return false;
        }
        if (!md2) {
            return false;
        }
        return md1.label == md2.label && md1.type == md2.type && md1.additionalData == md2.additionalData;
    }

    selection(md:Masterdata) {
        if (md.type == Constants.MILKTYPE) {
            return this.meal.bibber.milktypes.contains(md, AppComponent.equalsMasterdata) ? 'item-active' : '';
        } else if (md.type == Constants.GARNISH) {
            return this.meal.bibber.garnish && this.meal.bibber.garnish.label == md.label ? 'item-active' : '';
        } else if (md.type == Constants.DRUG) {
            return this.hasDrug(md) ? 'item-active' : '';
        } else if (md.type == Constants.MEALTYPE) {
            return this.hasMealType(md) ? 'item-active' : '';
        }

    }

    hasDrug(md:Masterdata):boolean {
        var tmpMd:Masterdata = Masterdata.cloneMasterdata(md);
        return this.meal.drugs.containsKey(tmpMd)
    }

    drugValue(md:Masterdata):number {
        return this.meal.drugs.getValue(md);
    }

    mealValue(md:Masterdata):number {
        var quantity:number = 0;
        if (this.meal.food.aliments.size() > 0) {
            this.meal.food.aliments.forEach((aliment:Aliment) => {
                if (aliment.type.label == md.label) {
                    quantity = aliment.quantity;
                }
                return true;
            });
        }
        return quantity;
    }

    tastValue(mealType:Masterdata, tast:Masterdata):boolean {
        var check:boolean = false;
        if (this.meal.food.aliments.size() > 0) {
            this.meal.food.aliments.forEach((aliment:Aliment) => {
                if (aliment.type.label == mealType.label) {
                    check = aliment.tasts.contains(tast, AppComponent.equalsMasterdata);
                }
                return true;
            });
        }
        return check;
    }

    hasMealType(md:Masterdata):boolean {
        var found:boolean = false;
        if (this.meal.food.aliments.size() > 0) {
            this.meal.food.aliments.forEach((aliment:Aliment) => {
                if (aliment.type.label == md.label) {
                    found = true;
                }
                return true;
            });
        }
        return found;
    }

    isSaltMeal(md:Masterdata):boolean {
        return md.additionalData == Constants.VEGETABLE;
    }

    isSugarMeal(md:Masterdata):boolean {
        return md.additionalData == Constants.FRUIT;
    }

    setMealQuantity(md:Masterdata, quantity:number) {
        this.meal.food.aliments.forEach((aliment:Aliment) => {
            if (md.label == aliment.type.label) {
                aliment.quantity = quantity;
                console.log('Adding ' + quantity + ' for ' + md.label);
            }
            return true;
        })
    }

    addDrug(md:Masterdata, quantity:number) {
        console.log('Adding ' + quantity + ' for ' + md.label);
        this.meal.drugs.setValue(Masterdata.cloneMasterdata(md), +quantity);
    }

    private static updateList(list:collections.LinkedList<Masterdata>, md:Masterdata) {
        if (list.contains(md, AppComponent.equalsMasterdata)) {
            console.log('Remove ' + md.label);
            list.remove(md, AppComponent.equalsMasterdata);
        } else {
            console.log('Add ' + md.label);
            list.add(md);
        }
    }

    public eat() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var url:string = Constants.MEAL_URL;
        if (localStorage.getItem("mealid")) {
            console.log(this.meal.prepareForPost(localStorage.getItem("mealid")));
            this.http.post(url, this.meal.prepareForPost(localStorage.getItem("mealid")), {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                    data => console.log('data = ' + data),
                    err => console.log(err),
                    () => console.log('Post complete')
                );
        } else {
            console.log(this.meal.prepareForPost(null));
            this.http.post(url, this.meal.prepareForPost(null), {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                    data => console.log('data = ' + data),
                    err => console.log(err),
                    () => console.log('Post complete')
                );
        }
        console.log('Bibber saved');
        localStorage.removeItem("mealid");
    }

    addRegurgitation() {
        this.meal.regurgitation = true;
    }

    removeRegurgitation() {
        this.meal.regurgitation = false;
    }

    public
    reset() {
        this.meal = new Meal;
        localStorage.removeItem("mealid");
    }
}
;
