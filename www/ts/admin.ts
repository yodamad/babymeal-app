/**
 * Created by mvincent on 14/11/2015.
 */
import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Constants} from './constants';
import {Masterdata} from './masterdata';

@Component({
    selector: 'admin-app',
    viewProviders: HTTP_PROVIDERS
})
@View({
    templateUrl: './templates/admin.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class AdminComponent {
    public item: Masterdata = new Masterdata();

    constructor(public http: Http) {}

    withAdditionalData():boolean {
        return this.item.type == Constants.MEALTYPE;
    }

    save() {
        console.log(JSON.stringify(this.item));

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(Constants.MD_ROOT_URL, JSON.stringify(this.item), {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => console.log('data = ' + data),
                err => console.log(err),
                () => console.log('Post complete')
            );
        console.log('Masterdata saved');
        this.item = new Masterdata();
    }
}