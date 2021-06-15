import { library, dom } from '@fortawesome/fontawesome-svg-core';
import Table from './Table';
import { HeadersConfig, APIConfig } from './types';

import {
    faArrowRight,
    faArrowLeft,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faExclamationCircle,
    faSearch
}
    from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft,
    faAngleDoubleLeft,
    faArrowRight,
    faAngleDoubleRight,
    faExclamationCircle,
    faSearch
);

dom.watch();

export class DefaultTable extends Table {

    public paginationHTML = '';
    public sortWay = '';
    public columnOrdering = '';

    constructor(tableConfiguration: APIConfig) {
        super(tableConfiguration);
        this.setColumnOrdering();

    }

    setSort() {
        if (this.tableConfiguration.sort.sortASC === true) {
            this.sortWay = 'ASC';
        } else {
            this.sortWay = 'DESC';
        }
    }

    setColumnOrdering() {
        this.tableConfiguration.headerConfig.map((element: HeadersConfig) => {
            if (element.sortThis === true) {
                this.columnOrdering = element.columnNameDB!;
            }

        });

    }

    async validateInput(input:any){

        this.setSort();

        const atrActualPage = this.tableConfiguration.attributesResponse.actualPage;
        const atrPages = this.tableConfiguration.attributesResponse.pages;
        const atrData = this.tableConfiguration.attributesResponse.data;

        const page = parseInt(input,10);

        if(isNaN(page)){
            return false;
        }

        if(page>this.tableConfiguration.pages){
            return false;
        }

        if(page===0) return false;



        const data:any = await this.tableConfiguration.paginationFn(page,this.sortWay,this.tableConfiguration.sort.sortingColumn!);
                
        this.updateInformation(data[atrActualPage],data[atrPages],data[atrData]);
    }

    sortingWay(){
        if(this.tableConfiguration.sort.sortASC===true){
            return 'ASC';
        }else{
            return 'DESC';
        }
    }

    async setURLQuerys(values:object){
        this.tableConfiguration.urlParams = values;

        const sort = this.sortingWay();
        const column = this.tableConfiguration.sort.sortingColumn!;

        this.getURLQuery();

        const data = await this.tableConfiguration.paginationFn(1,sort,column,this.tableConfiguration.urlParams);

        console.log('data',data);
        this.tableConfiguration.rows = data[this.tableConfiguration.attributesResponse.data];
        this.tableConfiguration.pages = data[this.tableConfiguration.attributesResponse.pages];
        this.tableConfiguration.actualPage = 1
        

        this.printTable();
        this.printPagination();
    }


    updateInformation(actualPage:number,pages:number,data:Array<object>){
        this.tableConfiguration.pages = pages;
        this.tableConfiguration.actualPage = actualPage;
        this.tableConfiguration.rows = data;

        this.printTable();
        this.printPagination();
    }

    printPagination() {

        const atrActualPage = this.tableConfiguration.attributesResponse.actualPage;
        const atrPages = this.tableConfiguration.attributesResponse.pages;
        const atrData = this.tableConfiguration.attributesResponse.data;
        this.paginationHTML = `
        <div class="w-50">
            <input id="searchPage-${this.tableConfiguration.idTable}" type="number" min="1" step="1" placeholder="Ir a pagina">
            <div id="searchPageBtn-${this.tableConfiguration.idTable}" class="default-pagination-search"><i class="fas fa-search"></i></div>
        </div>
        <div id="pagination-${this.tableConfiguration.idTable}-buttons" class="w-50">

        <div class="default-firstPage"><i class="fas fa-angle-double-left"></i></div>
        <div class="default-previousPage"><i class="fas fa-arrow-left"></i></div>
            
             <div>
               <span class="default-actualPage">${this.tableConfiguration.actualPage}</span>
               <span> - </span>
               <span class="default-totalPage">${this.tableConfiguration.pages}</span>
             </div>

             <div class="default-nextPage"><i class="fas fa-arrow-right"></i></div>
             <div class="default-lastPage"><i class="fas fa-angle-double-right"></i></div>
     `;

        document.getElementById(this.tableConfiguration.idPagination)!.innerHTML = this.paginationHTML;

        document.getElementById(`searchPageBtn-${this.tableConfiguration.idTable}`)!.addEventListener('click',()=>{
            const input = (<HTMLInputElement>document.getElementById(`searchPage-${this.tableConfiguration.idTable}`)).value;
            this.validateInput(input);
        });

        document.getElementById(`searchPage-${this.tableConfiguration.idTable}`)!.addEventListener('keyup',async(e)=>{
            if(e.key==='Enter'||e.keyCode===13){
                this.validateInput((<HTMLInputElement>e.target).value)
            }
        })

        document.getElementById(`pagination-${this.tableConfiguration.idTable}-buttons`)!.querySelectorAll('div').forEach((button, i) => {
            if (i === 0) {
                button.addEventListener('click', async () => {
                    this.setSort();
                    const data:any = await this.tableConfiguration.paginationFn(1, this.sortWay, this.tableConfiguration.sort.sortingColumn!);
                    
                    this.updateInformation(data[atrActualPage],data[atrPages],data[atrData]);

                });
            }

            if (i === 1) {
                button.addEventListener('click', async () => {
                    const page = this.tableConfiguration.actualPage - 1;
                    this.setSort();

                    if (page === 0) return;

                    const data:any = await this.tableConfiguration.paginationFn(page, this.sortWay, this.tableConfiguration.sort.sortingColumn!);
                    
                    this.updateInformation(data[atrActualPage],data[atrPages],data[atrData]);

                });
            }

            if (i === 3) {
                button.addEventListener('click', async () => {
                    const page = this.tableConfiguration.actualPage + 1;
                    this.setSort();

                    if (page > this.tableConfiguration.pages) return;

                    const data:any = await this.tableConfiguration.paginationFn(page, this.sortWay, this.tableConfiguration.sort.sortingColumn!);

                    this.updateInformation(data[atrActualPage],data[atrPages],data[atrData]);
                })
            }

            if (i === 4) {
                button.addEventListener('click', async () => {

                    const lastPage = this.tableConfiguration.pages;
                    this.setSort();

                    const data:any = await this.tableConfiguration.paginationFn(lastPage, this.sortWay, this.tableConfiguration.sort.sortingColumn!);

                    this.updateInformation(data[atrActualPage],data[atrPages],data[atrData]);
                })
            }
        });
    }
}