"use strict";
exports.__esModule = true;
var pagination_1 = require("./pagination");
// import { getAssignatures } from './helpers/api';
var JSDefaultTable = pagination_1.DefaultTable;
// let Users:DefaultTable;
// function printTest(e:Event){
//     console.log(Users.infoRow);
//     document.getElementById('plan')!.innerText = Users.infoRow.plan;
//     document.getElementById('materia')!.innerText = Users.infoRow.nombreMateria;
//     document.getElementById('salon')!.innerText = Users.infoRow.salon;
// }
// async function initialLoad() {
//     const hour = (<HTMLInputElement>document.getElementById('horaFiltro')).value;
//     const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;
//     const url = `&hora=${hour}&plan=${plan}`;
//     const assignatures = await getAssignatures(1, 'ASC', 'nombreMateria', url);
//     const header = [
//         { text: 'Materia', columnNameDB: 'nombreMateria', idHeader: 'nameAssignature', attributeToPrint: 'nombreMateria', sortable: true, sortThis: true },
//         { text: 'Salon', columnNameDB: 'salon', idHeader: 'assignatureRoom', attributeToPrint: 'salon', sortable: true }
//     ]
//     const sort: Sort = {
//         sqlSort: true,
//         sortASC: true
//     }
//     const urlParams = {
//         hora:hour,
//         materia:plan
//     }
//     const attributes:AttributesResponse = {
//         actualPage:'actualPage',
//         pages:'pages',
//         data:'assignatures'
//     }
//     const configuration: APIConfig = {
//         idTable: 'users-info',
//         idPagination: 'pagination-users-info',
//         urlParams,
//         pages: assignatures.pages,
//         actualPage: assignatures.actualPage,
//         rows: assignatures.assignatures,
//         headerConfig: header,
//         styleTable: 'default',
//         sort,
//         idRows: 'idAssignature',
//         cbSelection:printTest,
//         paginationFn:fetchFn,
//         attributesResponse:attributes
//     }
//     Users = new DefaultTable(configuration);
//     Users.printTable();
//     Users.printPagination();
//     document.getElementById('filtro')!.addEventListener('submit',(e)=>{
//         e.preventDefault();
//         const text = (<HTMLInputElement>document.getElementById('materiaBusqueda')).value;
//         if(text!==''){
//             Users.setURLQuerys({
//                 busqueda:text
//             });
//             Users.view();
//             return;
//         }
//         const hora = (<HTMLInputElement>document.getElementById('horaFiltro')).value;
//         const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;
//         Users.setURLQuerys({
//             hora,
//             materia:plan
//         });
//     })
// }
// initialLoad();
// async function fetchFn(page:number,order:string,column:string,urlQuery?:string){
//     const hour = (<HTMLInputElement>document.getElementById('horaFiltro')).value;
//     const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;
//     const url = `&hora=${hour}&plan=${plan}`;
//     const result = await getAssignatures(page,order,column,url);
//     const da = await result;
//     return da;    
// }
