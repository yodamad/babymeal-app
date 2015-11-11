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
    public static MD_URL: string = Constants.ROOT_URL + "/masterdata/search/findByType?type=";
    public static MEAL_URL: string = Constants.ROOT_URL + "/meal";
    public static POOP_URL: string = Constants.ROOT_URL + "/poop";
    public static DRUGS_URL: string = Constants.MD_URL + Constants.DRUG;
    public static MEALTYPES_URL: string = Constants.MD_URL + Constants.MEALTYPE;
    public static GARNISHES_URL: string = Constants.MD_URL + Constants.GARNISH;
    public static MILKTYPES_URL: string = Constants.MD_URL + Constants.MILKTYPE;
    public static FRUITS_URL: string = Constants.MD_URL + Constants.FRUIT;
    public static VEGETABLES_URL: string = Constants.MD_URL + Constants.VEGETABLE;
}
