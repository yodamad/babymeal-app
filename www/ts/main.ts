/**
 * Created by mvincent on 24/10/2015.
 */
import {Component, View, bootstrap, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Masterdata} from './masterdata';
import {Meal} from './meal';
import {Constants} from './constants';
import {collections} from './externals/collections';

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

    public eat() {
        console.log(this.meal);
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
                err => console.log('Impossible to retrieve vegetables'),
            () => console.log('Loaded vegetables')
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
                err => console.log('Impossible to retrieve milktypes'),
            () => console.log('Loaded milktypes')
        );
    }

    public getMealTypes() {
        this.http.get(Constants.MEALTYPES_URL)
            .map(res => res.json())
            .subscribe(
                data => this.mealtypes = data._embedded.masterdata,
                err => console.log('Impossible to retrieve milktypes'),
            () => console.log('Loaded milktypes')
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
    submitted: boolean = false;
    onSubmit() { this.submitted = true;}

    updateMeal(md: Masterdata) {
        if (md.type == 'MILKTYPE') {
            AppComponent.updateList(this.meal.bibber.milktypes, md);
        } else if (md.type = 'GARNISH') {
            if (this.meal.bibber.garnish.label == md.label) {
                console.log('Garnish already set');
            } else {
                console.log('Set garnish to ' + md.label);
                this.meal.bibber.garnish = md;
            }
        } else if (md.type == 'MEALTYPE') {
            if (this.meal.food.elements.contains(md)) {
                console.log('Mealtype already added ' + md.label);
            } else {
                this.meal.food.elements.add(md);
                console.log('Add mealtype to meal : ' + md.label)
            }
        }
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
};
bootstrap(AppComponent);