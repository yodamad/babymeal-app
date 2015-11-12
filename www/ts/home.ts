/**
 * Created by mvincent on 12/11/2015.
 */
import {Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'home-app',
})
@View({
    templateUrl: './templates/home.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class HomeComponent {

}