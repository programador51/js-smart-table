// import { library,dom } from '@fortawesome/fontawesome-svg-core';
// import { infoPagination,APIConfig } from './types';

// import { faArrowRight,
//     faArrowLeft,
//     faAngleDoubleLeft,
//     faAngleDoubleRight, 
//     faExclamationCircle  }     
// from '@fortawesome/free-solid-svg-icons';

// library.add(faArrowLeft,
//     faAngleDoubleLeft,
//     faArrowRight,
//     faAngleDoubleRight,
//     faExclamationCircle
// );

// dom.watch();
// export function generatePagination(tableConfig:APIConfig){

//     let sort:string;

//     if(tableConfig.sort.sortASC === true){
//         sort = 'ASC';
//     }else{
//         sort = 'DESC';
//     }

//     let columnOrdering = 'na';

//     tableConfig.headerConfig.map(header=>{
        
//         if(header.sortThis===true){
//             columnOrdering = `${header.columnNameDB}`;
//         }
//     });

//     if(tableConfig.styleTable===undefined) return;

//     const infoPagination:infoPagination = {
//         actualPage:tableConfig.actualPage,
//         noPages:tableConfig.pages
//     }

//     switch(tableConfig.styleTable){
//         case 'default':
//             const data = defaultPagination(tableConfig.idPagination,infoPagination,tableConfig.idTable,tableConfig,sort,columnOrdering);

//         return data;

//         default:
//         return;
//     }

// }

// function defaultPagination(id:string,info:infoPagination,idTable:string,tableConfig:APIConfig,sort:string,columnOrdering:string){

//     let data;

//     const paginationHTML = `<div class="w-50">
//         <input id="searchPage-${idTable}" type="number" min="1" step="1" placeholder="Ir a pagina">
//     </div>
    
//     <div id="pagination-${idTable}-buttons" class="w-50">

//     <div class="default-firstPage"><i class="fas fa-angle-double-left"></i></div>
//     <div class="default-previousPage"><i class="fas fa-arrow-left"></i></div>
            
//             <div>
//               <span class="default-actualPage">${info.actualPage}</span>
//               <span> - </span>
//               <span class="default-totalPage">${info.noPages}</span>
//             </div>

//             <div class="default-nextPage"><i class="fas fa-arrow-right"></i></div>
//             <div class="default-lastPage"><i class="fas fa-angle-double-right"></i></div>
//     `;

//     document.getElementById(id)!.innerHTML = paginationHTML;

//     document.getElementById(`pagination-${idTable}-buttons`)!.querySelectorAll('div').forEach((button,i)=>{
//         if(i===0){
//             button.addEventListener('click',async()=>{
//                data = await tableConfig.fetchFn(1,sort,columnOrdering);
//                return data;
//             })
//         }

//         if(i===1){
//             button.addEventListener('click',async()=>{
//                 const page = tableConfig.actualPage - 1;

//                 if(page===0) return;

//                 data = await tableConfig.fetchFn(page,sort,columnOrdering);
//                 return data;
//             })
//         }

//         if(i===3){
//             button.addEventListener('click',async()=>{
//                 const page = tableConfig.actualPage + 1;

//                 if(page===tableConfig.pages) return;

//                 data = await tableConfig.fetchFn(page,sort,columnOrdering);
//                 return data;
//             })
//         }

//         if(i===4){
//             button.addEventListener('click',async()=>{
//                 data = await tableConfig.fetchFn(tableConfig.pages,sort,columnOrdering);
//                 return data;
//             })
//         }
//     });

// }