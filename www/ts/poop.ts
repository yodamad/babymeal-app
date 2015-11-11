/**
 * Created by mvincent on 11/11/2015.
 */
import {Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Constants} from './constants';

@Component({
    selector: 'poop-app',
    viewProviders: HTTP_PROVIDERS
})
@View({
    templateUrl: './templates/poop.html',
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class PoopComponent {

    public supo:boolean = false;
    public poops:Array<Poop> = new Array<Poop>();

    constructor(public http:Http) {
        this.getPoops()
    }

    getPoops() {
        console.log('Loading poops...');
        this.http.get(Constants.POOP_URL)
            .map(res => res.json())
            .subscribe(
                data => this.poops = data._embedded.poop,
                err => console.log('err : ' + err),
                () => console.log('Poops loaded !')
            )
    };

    addSupo() {
        this.supo = true;
    }

    removeSupo() {
        this.supo = false;
    }

    printDate():string {
        var currentDate:Date = new Date();
        var day:string;
        if (currentDate.getDay() < 10) {
            day = 0 + currentDate.getDay().toString();
        } else {
            day = currentDate.getDay().toString();
        }
        ;

        return currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + day;
    }

    printTime():string {
        var currentDate:Date = new Date();
        var hours:string;
        var minutes:string;
        if (currentDate.getHours() < 10) {
            hours = 0 + currentDate.getHours().toString();
        } else {
            hours = currentDate.getHours().toString();
        }
        if (currentDate.getMinutes() < 10) {
            minutes = 0 + currentDate.getMinutes().toString();
        } else {
            minutes = currentDate.getMinutes().toString();
        }
        return hours + ':' + minutes;
    }

    poop() {
        var poopy:Poop = new Poop();
        var currentDate:Date = new Date();
        currentDate.getDate();
        poopy.date = this.printDate();
        poopy.time = this.printTime();
        poopy.withSuppository = this.supo;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(Constants.POOP_URL, JSON.stringify(poopy), {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => console.log('data = ' + data),
                err => console.log(err),
                () => console.log('Post complete')
            );
        console.log('Poop saved');

    }

    reset() {
        this.supo = false;
    }

    prettyPrint(poop: Poop): string {
        if (poop.withSuppository) {
            return poop.date + ' ' + poop.time + ' (avec supo)';
        } else {
            return poop.date + ' ' + poop.time;
        }
    }
}

class Poop {
    public date:string;
    public time:string;
    public withSuppository:boolean;
}