import { getAssignatures } from './helpers/api';

import { APIConfig, HeadersConfig, Sort,infoPagination } from './types';
// import { generatePagination } from './pagination';
import { Pagination } from './pages';

/**
 * Creates a table with information fetched from somewhere. This can be paginated, referenced, sortable by the API (if the API allows it) and sortable by the registeres fetched on that page (local sort client-side)
 * @class
 */
class APITable extends Pagination {

    /**
    * @type {APIConfig}
    */
    protected tableConfiguration: APIConfig;
    protected tableContent = '';
    protected htmlIdselectedRow = '';
    protected infoRow:any;
    protected columnOrderingBD:string|undefined;

    constructor(tableConfiguration: APIConfig) {
        super();
        this.tableConfiguration = tableConfiguration;
    }

    view() {
        console.log(this.tableConfiguration);
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

    printTable() {
        this.setStyle();
        this.generateHeader();
        this.generateBody();
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

        // generatePagination(this.tableConfiguration);
    }

    generateHeader() {
        let header = `<thead><tr>`;

        this.tableConfiguration.headerConfig.map((element: HeadersConfig) => {

            let cssSort = '';

            if (element.sortThis === true) {

                this.columnOrderingBD = element.columnNameDB;

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

let Users;

function printTest(e:Event){
    // console.log('Este es un evento',e);
}

async function initialLoad() {

    const assignatures = await getAssignatures(1, 'ASC', 'idAssignature', '&hora=5');
    // console.log(assignatures.assignatures);

    const header = [
        { text: 'Materia', columnNameDB: 'nombreMateria', idHeader: 'nameAssignature', attributeToPrint: 'nombreMateria', sortable: false, sortThis: true },
        { text: 'Salon', columnNameDB: 'salon', idHeader: 'assignatureRoom', attributeToPrint: 'salon', sortable: false }
    ]

    const sort: Sort = {
        sideSort: 'sql',
        sortASC: true
    }

    const configuration: APIConfig = {
        idTable: 'users-info',
        idPagination: 'pagination-users-info',
        urlParams: '&hora=5',
        pages: assignatures.pages,
        actualPage: assignatures.actualPage,
        rows: assignatures.assignatures,
        headerConfig: header,
        styleTable: 'default',
        sort,
        idRows: 'idAssignature',
        cbSelection:printTest,
        fetchFn:fetchFn
    }

    Users = new APITable(configuration);
    Users.printTable();
}

initialLoad();

async function fetchFn(page:number,order:string,column:string,urlQuery?:string){

    const hour = (<HTMLInputElement>document.getElementById('hourAssignature')).value;
    
    const url = `&hora=${hour}`;

    const result = await getAssignatures(page,order,column,url);
    const da = await result;
    return da;    
}