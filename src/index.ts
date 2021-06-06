import * as _ from 'lodash';

import { getAssignatures } from './helpers/api';

import { library,dom } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight,faArrowLeft,faAngleDoubleLeft,faAngleDoubleRight, faExclamationCircle  } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft,faAngleDoubleLeft,faArrowRight,faAngleDoubleRight,faExclamationCircle);
dom.watch();

import { 
    AttributesAPI,
    RowConfig,
    Sort
} from './types';
import { lastIndexOf } from 'lodash';
// import { get } from 'lodash';

/**
 * Tabulate the information into a table and be able to operate them
 * making a click on the info row
 */
export default class JsTable {
    /**
     * 
     * @param {string} idTable The id of the table which gonna apply this funcionality
     * @param {number} pages Number of pages that the api gives
     * @param {Array<object>} rows The data fetched for the current page
     * @param {number} actualPage Actual page of the tabulated data
     */

    protected tableContent:string;
    protected idSelectedRow:string;
    protected selectedRow:{[key:string]:any};

    constructor(
        private idTable: string,
        private idPagination:string,
        protected pages: number,
        protected rows: Array<object>,
        protected actualPage: number,
        private headerConfig:Array<object>,
        private rowsConfig:RowConfig,
        private styleTable:string,
        private cbSelection:(data:object)=>void,
        private fnFetch:(page:number,order:string,columnOrdering:string)=>any,
        private attributesFetch:AttributesAPI,
        protected sort:Sort
    ) {
        this.idTable = idTable;
        this.idPagination = idPagination;
        this.pages = pages;
        this.rows = rows;
        this.actualPage = actualPage;
        this.headerConfig = headerConfig;
        this.rowsConfig = rowsConfig;
        this.tableContent = '';
        this.styleTable = styleTable;
        this.selectedRow = {};
        this.idSelectedRow = '';
        this.cbSelection = cbSelection;
        this.fnFetch = fnFetch;
        this.attributesFetch = attributesFetch,
        this.sort = sort;
    }

    /**
     * This is just to view and "debug" what information contains the instance of the information
     */
    viewInfo() {
        console.log('idTable:', this.idTable);
        console.log('pages:', this.pages);
        console.log('rows', this.rows);
        console.log('actualPage', this.actualPage);
        console.log('headerConfig',this.headerConfig);
        console.log('sort',this.sort)
    }

    /**
     * Build the table and insert into the table with the id tag passed as argument
     */
    printTable(){

        this.generateHeader();

        const tableDOM = document.getElementById(this.idTable) as HTMLElement;

        if(this.styleTable!=='') tableDOM.classList.add(this.styleTable)

        this.tableContent += `<tbody>`;
        
        this.tableContent+=`<tr class="selectedRow" id="${this.idTable}-programador51"></tr>`;

        this.rows.map((row:any)=>{
            const idRow = `${this.idTable}-${row[this.rowsConfig.idRow]}`;
            let tr = `<tr id="${idRow}">`;
            this.rowsConfig.attributesToPrint.map((data,column)=>{
                const cssClasses = this.rowsConfig.columnsCSS[column];
                tr+=`<td class="${cssClasses}">${row[data]}</td>`;
            })

            tr+=`</tr>`;
            this.tableContent+=tr;
        });

        

        this.printOnDOM(this.idTable);
        this.idSelectedRow = `${this.idTable}-programador51`;

        this.generatePagination();
        this.printOnDOM(this.idPagination);

        this.givePaginationFunctionality();
        this.giveFunctionality();
        this.giveSortFunctionality();
    }

    generateHeader(){
        let header = `<thead><tr>`;

        this.headerConfig.map((element:any)=>{
            let th = `<th id="${this.idTable}-header-${element.columnNameDB}" 
            class="${element.css} ${element.columnNameDB == this.sort.column ? `sort-${this.sort.order}` : null}" 
            scope="col">${element.text}</th>`;
            header+=th;
        });

        header+=`</tr></thead>`;
        
        this.tableContent+=header;

    }

    generatePagination(){
        document.getElementById(`pagination-${this.idTable}`)!.classList.add(`pagination-table`);

        for(let i=3;i>=1;i--){
            if(this.actualPage-i>0){
                this.tableContent+=`<div>${this.actualPage-i}</div>`;
            }else{
                this.tableContent+=`<div class="disabled"></div>`;
            }
        }

        this.tableContent+=`
        <div id="${this.idTable}-firstPage"><span><i class="fas fa-angle-double-left"></i></span></div>
        <div id="${this.idTable}-previousPage"><span><i class="fas fa-arrow-left"></i></span></div>`;

        this.tableContent+=`<div>
                <input id="${this.idTable}-actualPage" type="number" value="${this.actualPage}">
            </div>
            
            <div id="${this.idTable}-nextPage"><span><i class="fas fa-arrow-right"></i></span></div>
            <div id="${this.idTable}-lastPage"><span><i class="fas fa-angle-double-right"></i></span></div>
        `;

        for(let i=1;i<=3;i++){

            if(this.actualPage+i<=this.pages){
                this.tableContent+=`<div>${this.actualPage+i}</div>`;
            }else{
                this.tableContent+=`<div class="disabled"></div>`;
            }
        }
    }

    /**
     * This will get the HTML string getted at the moment and print it on the DOM
     */
    printOnDOM(idDOM:string){
        const table = document.getElementById(idDOM) as HTMLElement;
        table.innerHTML = this.tableContent;
        this.tableContent = '';
    }

    giveSortFunctionality(){
        document.querySelectorAll(`#${this.idTable} th`).forEach(th=>{
            th.addEventListener('click',async(e)=>{
                let id = ((<HTMLInputElement>e.target).id);

                const sortColumn = id.substr(id.lastIndexOf('-')+1,id.length);
                
                if(this.sort.column === sortColumn){

                    if(this.sort.order === 'ASC'){
                        this.sort.order = 'DESC';
                    }else{
                        this.sort.order = 'ASC';
                    }
                }

                this.sort.column = sortColumn;

                const data = await this.fnFetch(this.actualPage,this.sort.order,this.sort.column);
                this.updateDataTabla(data);
                this.printTable();
                


                /* console.log(id.length);
                console.log(id.lastIndexOf('-')); */

            })
        })
    }

    givePaginationFunctionality(){
        document.getElementById(`${this.idTable}-actualPage`)!.addEventListener('keyup',async(e)=>{
            
            if(e.key==='Enter'||e.keyCode===13){
                const page = parseInt((<HTMLInputElement>e.target).value,10);

                if(isNaN(page)){
                    return;
                }

                if(page>this.pages){
                    return;
                }

                const data = await this.fnFetch(page,this.sort.order,this.sort.column);
                this.updateDataTabla(data);
            }

        });

        document.getElementById(`${this.idTable}-firstPage`)!.addEventListener('click',async()=>{

                if(this.actualPage!==1){
                    const data = await this.fnFetch(1,this.sort.order,this.sort.column);
                    this.updateDataTabla(data);
                }
        });

        document.getElementById(`${this.idTable}-nextPage`)!.addEventListener('click',async()=>{
            const data = await this.fnFetch(this.actualPage+1,this.sort.order,this.sort.column);
            this.updateDataTabla(data);
        });

        document.getElementById(`${this.idTable}-lastPage`)!.addEventListener('click',async()=>{
            if(this.actualPage!==this.pages){
                const data = await this.fnFetch(this.pages,this.sort.order,this.sort.column);
                this.updateDataTabla(data);
            }
        });

        document.getElementById(`${this.idTable}-previousPage`)!.addEventListener('click',async()=>{
            if(this.actualPage>1){
                const data = await this.fnFetch(this.actualPage-1,this.sort.order,this.sort.column);
                this.updateDataTabla(data);
            }
        });

        document.querySelectorAll(`#pagination-users-info div`).forEach((page,i)=>{
            page.addEventListener('click',async(e)=>{
                const pageNumber = parseInt(((<HTMLInputElement>e.target).innerText),10);
                
                if(isNaN(pageNumber)){
                    return;
                }

                const data = await this.fnFetch(pageNumber,this.sort.order,this.sort.column);
                this.updateDataTabla(data);

            });
        })
    }

    giveFunctionality(){
        const htmlRows = document.querySelectorAll(`#${this.idTable} tbody tr`);
        
        htmlRows.forEach(row=>{
            row.addEventListener('click',e=>{
                /**
                 * Quit the selection of the last selected row
                 */
                this.quitHover();

                const element = e.target as Element;
                const tr = element.parentNode as Element;
                const idData = tr.id.substring(this.idTable.length+1,tr.id.length);

                this.selectedRow = this.findData(idData);
                this.idSelectedRow = `${this.idTable}-${this.selectedRow[this.rowsConfig.idRow]}`;
                this.setHover();

                /**
                 * Executes some code (passed as argument on the instance of this class) after 
                 * the user clicks on some row
                 */
                this.cbSelection(this.selectedRow);
            })
        })
    }

    /**
     * Get the full information of the clicked row
     * @param {string} id - HTML id of the target clicked on the DOM
     * @returns {object} data - Data of the selected row
     */
    findData(id:string){
        const result = this.rows.find((data:any)=>data[this.rowsConfig.idRow].toString()===id);

        if(result){
            return result;
        }
        return {};
    }

    /**
     * Quit the hover of the last selected row
     */
    quitHover(){
        document.getElementById(this.idSelectedRow)?.classList.remove('selectedRow');
    }
    
    /**
     * Set the hover on the clicked row
     */
    setHover(){
        document.getElementById(this.idSelectedRow)?.classList.add('selectedRow');
    }

    updateDataTabla(data:any){
        this.pages = data[this.attributesFetch.pages];
        this.rows = data[this.attributesFetch.rows];
        this.actualPage = data[this.attributesFetch.actualPage];
        this.printTable();
    }
}

/////////////////////////////////////////////////

let Users;

async function loadUsers() {

    /**
     * Return the data that's gonna be printed on the table
     */
    const assignatures = await getAssignatures(1,'ASC','idAssignature');

    const headerConfiguration = [
        {text:'ID',columnNameDB:'idAssignature',idHeader:'id-assignature-header'},
        {text:'Materia',columnNameDB:'nombreMateria',idHeader:'assignature-name-header'},
        {text:'Hora',columnNameDB:'hora',idHeader:'hora-header'}

    ]

    const rowConfiguration = {
        idRow:'idAssignature',
        columnsCSS:["text-center",''],
        attributesToPrint:["idAssignature","nombreMateria","hora"]
    }

    const sort = {
        column:'idAssignature',
        order:'DESC'
    }

    const cbSelection = (data:{[key:string]:any}) => {
        console.log('cb clicked');
    }

    async function hi(page:number,order:string,column:string){
        return await getAssignatures(page,order,column);
    }

    Users = new JsTable(
        'users-info',
        'pagination-users-info', 
        assignatures.pages, 
        assignatures.assignatures, 
        assignatures.actualPage,
        headerConfiguration,
        rowConfiguration,
        'default',
        cbSelection,
        hi,
        {
            pages:'pages',
            actualPage:'actualPage',
            rows:'assignatures'
        },
        sort

    );

    Users.printTable();
    Users.viewInfo();
}

loadUsers();