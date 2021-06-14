// export type HeaderTable = {
//     text:string,
//     columnNameDB:string,
//     idHeader:string,
//     css?:string,
// }

// export type RowConfig = {
//     idRow:string,
//     columnsCSS:Array<string>,
//     attributesToPrint:Array<string>
// }

// export type AttributesAPI = {
//     pages:string,
//     actualPage:string,
//     rows:string
// }

// export type Sort = {
//     column:string,
//     order:string,
    
// }

/**
 * Configuration that must receive "APITable" in order to work
*/
export type APIConfig = {
    /**
     * HTML id of the tag table that it's on the HTML
     */
    idTable:string,

    /**
     * HTML id of the tag "container" for the pagination that it's on the HTML
     */
    idPagination:string,

    /**
     * URL Params in case that the API need it's for do an OK query of the requested data
     */
    urlParams?:string,

    /**
     * Number of pages that has the fetched data
     */
    pages:number,

    /**
     * Data fetched from the API that's that can be printed on the table
     */
    rows:Array<object>,

    /**
     * Actual page that corresponds to the fetched data
     */
    actualPage:number,

    /**
     * Configuration to set the headers of the table
     */
    headerConfig:Array<HeadersConfig>,

    /**
     * If you want to try some of the themes that offers this library, you can pass as argument
     * the name of the theme to apply it. If it's not passed, you probably must style it, otherwise will look a king of ugly
     */
     styleTable?:string,

     /**
      * A function that you can pass as argument to something after you click some row of the table
      */
     cbSelection?:(e:Event)=>void,

    /**
     * If your API use query params and this url params could be change because the user can filter the information or something.
     * You can change this attribute. In case it's !== from undefined, it will be add to the url endpoint. 
     */
     urlParams?:string,

     /**
      * The "tr" tags that will be build. Can have an "id" attribute. This id will be get from one of the attributes
      * of the fetched data. So, the string must match with the response of the resource data.
      */
     idRows:string,
    
     /**
      * This will the manner of sorting the data in case the user press the column of the table
      */
     sort:Sort,
     
     /**
      * This function will be use to fetch data through the buttons of navagition, and, if the API allows it, to order the data by columns in ASC or DESC
      */
     fetchFn:(page:number,order:string,column:string,urlQuery?:string)=>object
}

/**
 * Configuration to set properyly the header of the printed table
 */
export type HeadersConfig = {
    /**
     * Text that's gonna be showed on the "th" tags
     */
    text:string,

    /**
     * Name of the column that corresponds on the table, this must match in case you want order the data from the DB
     */
    columnNameDB?:string,

    /**
     * The id attribute of the tag "th" that's gonna be created
     */
    idHeader:string

    /**
     * Name of the property to print. From the data fetched, you need to choose which data it's gonna be printed
     * for that column
     */
    attributeToPrint:string,

    /**
     * The rows that will be printed can have your custom css classes in case you want add
     * a bold font, an specific color, an aligment, etc.
     */
    css?:string,

    /**
     * This will indicate if it's allowed to sort the column by ASC or DESC (independently if the class on the client-side or API)
     */
    sortable:boolean,

    /**
     * This it's just to highlight on the html the actual sorting
     */
    sortThis?:boolean
}

export type Sort = {

    /**
     * Indicate the sort it's gonna be made by the browsers of the sql motor that provides the data
     */

    sideSort:string,

    /**
     * true for ASC and false for DESC
     */
    sortASC:boolean
}

export type infoPagination = {
    /**
     * Actual page which it's the table
     */
    actualPage:number,

    /**
     * Number of pages that contain the table
     */
    noPages:number
}