/**
 * Configuration that must receive "APITable" in order to work
 * @example
 * const configuration: APIConfig = {
        idTable: 'users-info',
        idPagination: 'pagination-users-info',
        urlParams:'&hora=4&materia=1',
        pages: 10,
        actualPage: 2,
        rows: [{...},{...},{...}],
        headerConfig: [
        { text: 'Materia', columnNameDB: 'nombreMateria', idHeader: 'nameAssignature', attributeToPrint: 'nombreMateria', sortable: true, sortThis: true },
        { text: 'Salon', columnNameDB: 'salon', idHeader: 'assignatureRoom', attributeToPrint: 'salon', sortable: true }
        ],
        styleTable: 'default',
        sort : {
            sqlSort: true,
            sortASC: true   
        },
        idRows: 'idAssignature',
        cbSelection,
        paginationFn,
        attributesResponse:{
            actualPage:'actualPage',
            pages:'pages',
            data:'assignatures'
        }
    }
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
     * Each attribute will be the name of the query param and his value, well, his value.
     */
    urlParams?:object,

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
     paginationFn:(page:number,order:string,column:string,urlQuery?:string)=>object,

     /**
      * Name of the attributes that contains the data fetched
      */
     attributesResponse:AttributesResponse,

     /**
      * Actually, you dont't need to touch it or add it. It's just in order to work
      */
     stringQuery?:string
}

/**
 * Configuration to set properyly the header of the printed table
 * @example 
 * const header = [
    { text: 'Materia', columnNameDB: 'nombreMateria', idHeader: 'nameAssignature', attributeToPrint: 'nombreMateria', sortable: true, sortThis: true },
    { text: 'Salon', columnNameDB: 'salon', idHeader: 'assignatureRoom', attributeToPrint: 'salon', sortable: true }
    ]
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

/**
 * The table can be sort, we need to know how will be the sort
 * @example 
 * const sort: Sort = {
        sqlSort: true,
        sortASC: true
    }
 */
export type Sort = {

    /**
     * If true, the code will fetch the actual page to the DB, but sending the params of sorting.
     * If false, the data will be sorted on the client side
     */

    sqlSort:boolean,

    /**
     * true for ASC and false for DESC
     */
    sortASC:boolean,

    /**
     * No need to touch, just to ensure the library works
     */
    sortingColumn?:string
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

/**
 * When the data it's fetched, we need to know which one correspond to match the data with the library
 * @example
 * const attributes:AttributesResponse = {
        actualPage:'actualPage',
        pages:'pages',
        data:'assignatures'
    }
 */
export type AttributesResponse = {

    /**
     * When the information respons the JSON, it's necessary know the name of the attribute that contains the
     * number of pages
     */
    pages:string,

    /**
     * When the information respons the JSON, it's necessary know the name of the attribute
     * that contain the actualPage
     */
    actualPage:string,


    /**
     * When the data comes, in which attribute it's that Array<object>
     */
    data:string
}