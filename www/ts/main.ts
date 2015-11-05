/**
 * Created by mvincent on 24/10/2015.
 */
import {Component, View, bootstrap, FORM_DIRECTIVES, CORE_DIRECTIVES,} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {Masterdata} from './masterdata';
import {Meal} from './meal';
import {Constants} from './constants';
import {collections} from './externals/collections';
import NumberFormat = Intl.NumberFormat;

@Component({
    selector: 'babymeal-app',
    viewProviders: HTTP_PROVIDERS
})
@View({
    templateUrl: './templates/main.html',
    styleUrls: ['./css/babymeal.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class AppComponent {
    public vegetables: Array<Masterdata>;
    public fruits: Array<Masterdata>;
    public drugs: Array<Masterdata>;
    public milktypes: Array<Masterdata>;
    public mealtypes: Array<Masterdata>;
    public garnishes: Array<Masterdata>;

    constructor(public http: Http) {
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
    meal: Meal = new Meal;
    updateMeal(md: Masterdata) {
        if (md.type == Constants.MILKTYPE) {
            AppComponent.updateList(this.meal.bibber.milktypes, md);
        } else if (md.type == Constants.GARNISH) {
            if (this.meal.bibber.garnish && this.meal.bibber.garnish.label == md.label) {
                console.log('Garnish already set');
            } else {
                console.log('Set garnish to ' + md.label);
                this.meal.bibber.garnish = md;
            }
        } else if (md.type == Constants.MEALTYPE) {
            if (this.meal.food.elements.contains(md)) {
                console.log('Mealtype already added ' + md.label);
            } else {
                this.meal.food.elements.add(md);
                console.log('Add mealtype to meal : ' + md.label)
            }
        } else if (md.type == Constants.DRUG) {
            var tmpMd: Masterdata = AppComponent.cloneMasterdata(md);
            if (this.hasDrug(md)) {
                console.log('Remove drug' + tmpMd.label);
                this.meal.drugs.remove(tmpMd);
            } else {
                console.log('Add drug' + tmpMd.label);
                this.meal.drugs.setValue(tmpMd, 1);
            }
        }
    }

    selection(md: Masterdata) {
        if (md.type == Constants.MILKTYPE) {
            return this.meal.bibber.milktypes.contains(md) ? 'item-active' : '';
        } else if (md.type == Constants.GARNISH) {
            return this.meal.bibber.garnish && this.meal.bibber.garnish.label == md.label ? 'item-active' : '';
        } else if (md.type == Constants.DRUG) {
            return this.hasDrug(md) ? 'item-active' : '';
        }
    }

    hasDrug(md: Masterdata): boolean {
        var tmpMd: Masterdata = AppComponent.cloneMasterdata(md);
        return this.meal.drugs.containsKey(tmpMd)
    }

    addDrug(md: Masterdata, quantity: number) {
        console.log('Adding ' + quantity + ' for ' + md.label);
        this.meal.drugs.setValue(AppComponent.cloneMasterdata(md), +quantity);
    }

    private static cloneMasterdata(md: Masterdata): Masterdata {
        var tmpMd: Masterdata = new Masterdata();
        tmpMd.label = md.label;
        tmpMd.type = md.type;
        tmpMd.additionalData = md.additionalData;
        return tmpMd;
    }

    private static updateList(list: collections.LinkedList<Masterdata>, md: Masterdata) {
        if (list.contains(md)) {
            console.log('Remove ' + md.label);
            list.remove(md);
        } else {
            console.log('Add ' + md.label);
            list.add(md);
        }
    }

    public eat() {
        console.log(this.meal);
        console.log(this.meal.prepareForPost());

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(Constants.MEAL_URL, this.meal.prepareForPost(), {
            headers: headers
        })
            .map(res => res.json())
        .subscribe(
            data => console.log('data = ' + data),
            err => console.log(err),
            () => console.log('Post complete')
        );
        console.log('Data sent');
    }
};
bootstrap(AppComponent);