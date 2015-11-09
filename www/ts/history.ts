/**
 * Created by mvincent on 07/11/2015.
 */
import {Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Constants} from './constants';
import {JsonMeal, JsonBibber, JsonFood, JsonAliment} from './meal';

@Component({
    selector: 'history-app',
    viewProviders: HTTP_PROVIDERS
})
@View({
    templateUrl: './templates/history.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HistoryComponent {

    public meals:Array<JsonMeal> = new Array<JsonMeal>();

    constructor(public http:Http) {
        this.getMeals();
    }

    getMeals() {
        console.log('Loading meals...');
        this.http.get(Constants.MEAL_URL)
            .map(res => res.json())
            .subscribe(
                data => this.meals = data._embedded.meal,
                err => console.log('err : ' + err),
                () => console.log('Meals loaded !')
            )
    };

    hasMilks(bibber:JsonBibber):boolean {
        console.log('Check milks : ' + bibber.milks);
        if (bibber.milks) {
            return bibber.milks.length > 0;
        } else {
            return false;
        }
    }

    hasFood(food:JsonFood):boolean {
        console.log('Check food');
        if (food) {
            if (food.aliments) {
                return food.aliments.length > 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    hasTast(aliment:JsonAliment):boolean {
        console.log('Check aliment');
        if (aliment) {
            if (aliment.tasts) {
                return aliment.tasts.length > 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}