// import { APIConfig, Sort,AttributesResponse } from './types';
import { DefaultTable } from './pagination';
// import { getAssignatures } from './helpers/api';

// const JSDefaultTable = DefaultTable;

// let Users:DefaultTable;

// function showOptions(e:Event){
//     console.log(Users.infoRow);
    
//     document.getElementById('plan')!.innerText = Users.infoRow.plan;
//     document.getElementById('materia')!.innerText = Users.infoRow.nombreMateria;
//     document.getElementById('salon')!.innerText = Users.infoRow.salon;

//     let optionsHTML = `
//     <button 
//         type="button" 
//         class="btn btn-primary" 
//         data-toggle="modal" 
//         data-target="#modalEdit">
//             Edit assignature
//     </button>
//     `;
    
//     let modal = `
    
//     <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Update '${Users.infoRow.nombreMateria}'</h5>
//         <button
//           type="button"
//           class="close"
//           data-dismiss="modal"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         <form>
//           <div class="form-group">
//             <label for="recipient-name" class="col-form-label"
//               >Update the group to impart this assignature:</label
//             >
//             <input type="number" class="form-control" id="grupo-input" />
//           </div>
//           <div class="form-group">
//             <label for="message-text" class="col-form-label"
//               >Change the classroom to impart this assignature:</label
//             >
//             <input type="number" class="form-control" id="salon-input" />
//           </div>
//         </form>
//       </div>

//     <p class="px-5">
//         As you can see, you can do whatever you want, you have the information to make a reference to that
//         on any operation that you want. In this example, i could update the information 
//         of '${Users.infoRow.nombreMateria}' and i didn't have to fetch the API <b> a second time </b> to know
//         this information, cause everything was on the first load when the information was tabulated with the library.


//     </p>

//       <div class="modal-footer">
//         <button
//           type="button"
//           class="btn btn-secondary"
//           data-dismiss="modal"
//         >
//           Cancel
//         </button>
//         <button type="button" class="btn btn-primary">
//           Update
//         </button>
//       </div>
//     </div>
//   </div>
    
//     `;

//     (<HTMLElement>document.getElementById('actionsAssignature')).innerHTML = optionsHTML;
//     (<HTMLElement>document.getElementById('modalEdit')).innerHTML = modal;

//     (<HTMLInputElement>document.getElementById('grupo-input')).value = Users.infoRow.grupo;
//     (<HTMLInputElement>document.getElementById('salon-input')).value = Users.infoRow.salon;
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
//         cbSelection:showOptions,
//         paginationFn:fetchFn,
//         attributesResponse:attributes
//     }

//     Users = new DefaultTable(configuration);
//     Users.printTable();
//     Users.printPagination();

//     console.log(Users.tableConfiguration.urlParams);

//     document.getElementById('filtro')!.addEventListener('submit',(e)=>{
//         e.preventDefault();
        
//         const hora = (<HTMLInputElement>document.getElementById('horaFiltro')).value;
//         const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;

//         Users.setURLQuerys({
//             hora,
//             plan
//         });


//     })

// }

// initialLoad();

// async function fetchFn(page:number,order:string,column:string,urlQuery?:string){

//     const hour = (<HTMLInputElement>document.getElementById('horaFiltro')).value;
//     const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;

//     const url = `&hora=${hour}&plan=${plan}`;

//     Users.tableConfiguration.urlParams = {
//       hora:hour,
//       plan:plan
//     }

//     console.log('query',Users.tableConfiguration.stringQuery)

//     const result = await getAssignatures(page,order,column,Users.tableConfiguration.stringQuery);

//     (<HTMLElement>document.getElementById('plan')).innerHTML = '';
//     (<HTMLElement>document.getElementById('materia')).innerHTML = '';
//     (<HTMLElement>document.getElementById('salon')).innerHTML = '';
//     (<HTMLElement>document.getElementById('actionsAssignature')).innerHTML = '';

//     Users.infoRow = {};

//     console.log(Users.tableConfiguration.urlParams);

//     const da = await result;
//     return da;    
// }