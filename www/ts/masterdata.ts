/**
 * Created by mvincent on 02/11/2015.
 */
import {collections} from './externals/collections';

export class Masterdata {
    public label: string;
    public type: string;
    public additionalData: string;

    toString():string {
        return this.type + '_' + this.label;
    }
}