/**
 * Created by mvincent on 11/11/2015.
 */
import {Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Constants} from './constants';
import {SecurityUtils} from './security';

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
    public poops:Array<Poop> = [];
    public currentDate: string = Constants.printDate();
    public currentTime: string = Constants.printTime();

    constructor(public http:Http) {
        this.getPoops()
    }

    getPoops() {
        console.log('Loading poops...');
        this.http.get(Constants.POOP_URL + Constants.SORTED_BY_DATE_TIME_DESC, SecurityUtils.authentication())
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

    poop() {
        var poopy:Poop = new Poop();
        poopy.date = this.currentDate;
        poopy.time = this.currentTime;
        poopy.withSuppository = this.supo;
        var headers: Headers = SecurityUtils.authenticationHeader();
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

    getDelay() {
        var tmpPoop: Poop = this.poops[0];
        var delay: Date = new Date(Constants.computeDelay(tmpPoop.date, tmpPoop.time));
        var strDelay: string = ''
        if (delay.getDate() > 1) {
            strDelay = (delay.getDate() - 1) + 'j ';
        }
        strDelay += delay.getHours() + 'h' + delay.getMinutes() + 'min';
        return strDelay;
    }

    reset() {
        this.supo = false;
        this.currentDate = Constants.printDate();
        this.currentTime = Constants.printTime();
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