import { HeadersConfig,APIConfig } from './types';

/**
 * Creates a table with information fetched from somewhere. This can be paginated, referenced, sortable by the API (if the API allows it) and sortable by the registeres fetched on that page (local sort client-side).
 * In order this lib works, the API MUST response an object with an attribute named 'data' which can contain all the data and structure as you need
 * @class
 */
 export default class Table{

    /**
    * @type {APIConfig}
    */
    protected tableConfiguration: APIConfig;
    protected tableContent = '';
    protected htmlIdselectedRow = '';
    protected infoRow:any;

    constructor(tableConfiguration: APIConfig) {
        this.tableConfiguration = tableConfiguration;
    }

    view() {
        // console.log(this.tableConfiguration);
    }

    setStyle() {

        const style = this.tableConfiguration.styleTable;

        if (style !== undefined) {
            document.getElementById(this.tableConfiguration.idTable)!.classList.add(style);
        }

    }

    selectionFunctionality(){
        document.querySelectorAll(`#${this.tableConfiguration.idTable} tbody tr`).forEach(row=>{
            row.addEventListener('click',e=>{

                this.quitHover();

                const element = (<HTMLInputElement>e.target).parentNode as HTMLInputElement;
                this.htmlIdselectedRow = element.id;
                
                this.setHover();

                if(this.tableConfiguration.cbSelection===undefined){
                    return;
                }

                const idInfo = this.htmlIdselectedRow.substr(this.tableConfiguration.idTable.length+1,this.htmlIdselectedRow.length);
                this.infoRow = this.updateInfoRow(idInfo);
                this.tableConfiguration.cbSelection(e);

            });
        });
    }

    updateInfoRow(id:string){
        const info = this.tableConfiguration.rows.find((data:any)=>data[this.tableConfiguration.idRows].toString()===id);
        return info;
    }

    quitHover(){
        const element = document.getElementById(this.htmlIdselectedRow);
        element!.classList.remove('selectedRow');
    }

    setHover(){
        const element = document.getElementById(this.htmlIdselectedRow);
        element!.classList.add('selectedRow');
    }

    getURLQuery(){

        if(this.tableConfiguration.urlParams!==undefined){

            let stringURLParams = '';

            const params = Object.keys(this.tableConfiguration.urlParams);

            params.map((param:any)=>{

                const query = `&${param}`;
                const queryValue = this.tableConfiguration.urlParams[param];

                stringURLParams+=`${query}=${queryValue}`;

            });

            this.tableConfiguration = {
                ...this.tableConfiguration,
                stringQuery:stringURLParams
            };
        }


    }

    printTable() {
        this.setStyle();
        this.generateHeader();
        this.generateBody();
        this.getURLQuery();
        this.view();
    }

    generateBody() {
        this.tableContent += `<tbody>`;
        this.tableContent += `<tr 
        class="selectedRow" 
        id="${this.tableConfiguration.idTable}-programador51"></tr>`;

        this.tableConfiguration.rows.map((data: any) => {

            let idRow = this.tableConfiguration.idTable;

            if (this.tableConfiguration.idRows !== undefined) {
                idRow += `-${data[this.tableConfiguration.idRows]}`;
            }

            let tr = `<tr id="${idRow}">`;

            this.tableConfiguration.headerConfig.map((info: HeadersConfig,i) => {
                let aditionalCSS = '';

                if (info.css !== undefined) {
                    aditionalCSS = info.css;
                }

                tr += `<td class="${aditionalCSS}">${data[info.attributeToPrint]}</td>`;
            });

            tr += `</tr>`;
            this.tableContent += tr;

        })

        this.printOnDOM(this.tableConfiguration.idTable);
        this.htmlIdselectedRow = `${this.tableConfiguration.idTable}-programador51`;
        this.selectionFunctionality();
        this.sortFunctionality();
    }

    sortFunctionality(){

        const th = document.querySelectorAll(`#${this.tableConfiguration.idTable} th`);

        if(this.tableConfiguration.sort.sqlSort === true){
            th.forEach(header=>{
                header.addEventListener('click',async(e)=>{

                    const target = (<HTMLInputElement>e.target).id;

                    this.tableConfiguration.headerConfig.map(element=>{
                        element.sortThis = false;
                    });

                    
                    const sizeId = target.length;
                    
                    const attributeToPrint = target.substr(7,sizeId);
                    
                    const columnDB = this.tableConfiguration.headerConfig.find(column=>column.attributeToPrint === attributeToPrint);

                    const column = (columnDB?.columnNameDB);

                    this.tableConfiguration.sort.sortingColumn = column;

                    columnDB!.sortThis = true;

                    this.tableConfiguration.headerConfig

                    const actualPage = this.tableConfiguration.actualPage;

                    let sortWay:string;

                    if(this.tableConfiguration.sort.sortASC === true){

                        /**
                         * The users toggled the sort way to desc
                         */

                        this.tableConfiguration.sort.sortASC = !this.tableConfiguration.sort.sortASC;

                        sortWay = 'DESC';
                    }else{

                        /**
                         * The users toggled the sort way to asc
                         */
                        this.tableConfiguration.sort.sortASC = !this.tableConfiguration.sort.sortASC;
                        sortWay = 'ASC';
                    }

                    const response:any = await this.tableConfiguration.paginationFn(actualPage,sortWay,column!);

                    this.tableConfiguration.pages = response[this.tableConfiguration.attributesResponse.pages];
                    this.tableConfiguration.rows = response[this.tableConfiguration.attributesResponse.data];

                    this.printTable();

                });
            })
        }else{
            th.forEach(header=>{
                header.addEventListener('click',()=>{
                    alert('Ordenando en el lado del cliente - [Funcionalidad pendiente]');
                })
            })
        }
    }

    generateHeader() {
        let header = `<thead><tr>`;

        this.tableConfiguration.headerConfig.map((element: HeadersConfig) => {

            let cssSort = '';

            if (element.sortThis === true) {

                this.tableConfiguration.sort.sortingColumn = element.columnNameDB;

                if (this.tableConfiguration.sort.sortASC === true) {
                    cssSort = 'sort-ASC';
                } else {
                    cssSort = 'sort-DESC';
                }
            }

            if (element.css === undefined) {
                element.css = '';
            }

            let th = `<th id="header-${element.columnNameDB}" 
        class="${element.css} ${element.sortThis === true ? `${cssSort}` : ''}" 
        scope="col">${element.text}</th>`;
            header += th;
        });

        header += `</tr></thead>`;
        this.tableContent += header;
    }

    printOnDOM(id: string) {
        const table = document.getElementById(id) as HTMLElement;
        table.innerHTML = this.tableContent;
        this.tableContent = '';
    }
}