/**
 * Created by mvincent on 23/11/2015.
 */

import {Headers} from 'angular2/http';

export class SecurityUtils {

    static authentication() {
        return {
            headers: this.authenticationHeader()
        };
    }

    static authenticationHeader(): Headers {
        return new Headers({'Authorization': 'Basic ' + btoa('Robin' + ':' + '#20150620#')});
    }
}