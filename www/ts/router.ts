///<reference path="../node_modules/angular2/angular2.d.ts"/>
///<reference path="../node_modules/angular2/router.d.ts"/>
/**
 * Created by mvincent on 07/11/2015.
 */
import {bootstrap, Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './main';
import {HomeComponent} from './home';
import {HistoryComponent} from './history';
import {PoopComponent} from './poop';

@Component({
    selector: 'app',
    templateUrl: './templates/router.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: "/Home", component: HomeComponent, as: "Home"},
    {path: "/Bibber", component: AppComponent, as: "Bibber"},
    {path: "/History", component: HistoryComponent, as: "History"},
    {path: "/Poop", component: PoopComponent, as: "Poop"},
])
export class AppRouter {
    constructor() {
        console.log('Init router');
        location.href = "#/Home";
    }
}
bootstrap(AppRouter, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);