/**
 * Created by mvincent on 01/11/2015.
 */

export class Constants {
    public static ROOT_URL: string = "http://babymeal-jahland.rhcloud.com";
    public static MD_URL: string = Constants.ROOT_URL + "/masterdata/search/findByType?type=";
    public static DRUGS_URL: string = Constants.MD_URL + "DRUG";
    public static MEALTYPES_URL: string = Constants.MD_URL + "MEALTYPE";
    public static GARNISHES_URL: string = Constants.MD_URL + "GARNISH";
    public static MILKTYPES_URL: string = Constants.MD_URL + "MILKTYPE";
    public static FRUITS_URL: string = Constants.MD_URL + "FRUIT";
    public static VEGETABLES_URL: string = Constants.MD_URL + "VEGETABLE";
}
