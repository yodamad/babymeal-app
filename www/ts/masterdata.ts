/**
 * Created by mvincent on 02/11/2015.
 */
export class Masterdata {
    public label: string;
    public type: string;
    public additionalData: string;

    toString():string {
        return this.type + '_' + this.label;
    }

    public static cloneMasterdata(md: Masterdata): Masterdata {
        var tmpMd: Masterdata = new Masterdata();
        tmpMd.label = md.label;
        tmpMd.type = md.type;
        tmpMd.additionalData = md.additionalData;
        return tmpMd;
    }
}