/**
 * Created by mvincent on 12/11/2015.
 */
import {Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {JsonMeal} from "./meal";
import {Constants} from "./constants";
import {SecurityUtils} from "./security";

@Component({
    selector: 'home-app',
    viewProviders: HTTP_PROVIDERS
})
@View({
    templateUrl: './templates/home.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HomeComponent {
    public meals:Array<JsonMeal> = [];
    public loading: boolean = true;

    constructor(public http:Http) {
        this.getMeals();
    }

    getMeals() {
        console.log('Loading meals...');
        this.http.get(Constants.MEAL_URL + Constants.SORTED_BY_DATE_TIME_DESC, SecurityUtils.authentication())
            .map(res => res.json())
            .subscribe(
                data => this.displayData(data),
                err => console.log('err : ' + err),
                () => console.log('Meals loaded !')
            )
    };

    displayData(data) {
        this.meals = data._embedded.meal;
        this.loading = false;
    }
}