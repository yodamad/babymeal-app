/**
 * Created by mvincent on 07/11/2015.
 */
import { bootstrap, bind } from 'angular2/angular2';

import { LocationStrategy, HashLocationStrategy } from 'angular2/router';

import { AppRouter } from './router';


var universalInjectables = [
    bind(LocationStrategy).toClass(HashLocationStrategy)
];

bootstrap(AppRouter, [universalInjectables]);