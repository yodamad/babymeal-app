/**
 * Created by mvincent on 01/11/2015.
 */

export class Constants {
    // Masterdata types
    public static GARNISH: string = 'GARNISH';
    public static DRUG: string = 'DRUG';
    public static MEALTYPE: string = 'MEALTYPE';
    public static MILKTYPE: string = 'MILKTYPE';
    public static FRUIT: string = 'FRUIT';
    public static VEGETABLE: string = 'VEGETABLE';

    // URLs
    public static ROOT_URL: string = "http://babymeal-jahland.rhcloud.com";
    //public static ROOT_URL: string = "http://localhost:8080";
    public static MD_ROOT_URL: string = Constants.ROOT_URL + "/masterdata";
    public static MD_URL: string = Constants.MD_ROOT_URL + "/search/findByType?type=";
    public static MEAL_URL: string = Constants.ROOT_URL + "/meal";
    public static POOP_URL: string = Constants.ROOT_URL + "/poop";
    public static DRUGS_URL: string = Constants.MD_URL + Constants.DRUG;
    public static MEALTYPES_URL: string = Constants.MD_URL + Constants.MEALTYPE;
    public static GARNISHES_URL: string = Constants.MD_URL + Constants.GARNISH;
    public static MILKTYPES_URL: string = Constants.MD_URL + Constants.MILKTYPE;
    public static FRUITS_URL: string = Constants.MD_URL + Constants.FRUIT;
    public static VEGETABLES_URL: string = Constants.MD_URL + Constants.VEGETABLE;

    static printDate():string {
        var currentDate:Date = new Date();
        var day:string;
        var month:string;
        if (currentDate.getDate() < 10) {
            day = 0 + currentDate.getDate().toString();
        } else {
            day = currentDate.getDate().toString();
        }
        if (currentDate.getMonth() < 10) {
            month = 0 + (currentDate.getMonth() + 1).toString();
        } else {
            month = (currentDate.getMonth() + 1).toString();
        }
        return currentDate.getFullYear() + '-' + month + '-' + day;
    }

    static printTime():string {
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
}
