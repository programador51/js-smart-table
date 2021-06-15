/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n// Just for testing purposes\r\n// let Users:DefaultTable;\r\n// function printTest(e:Event){\r\n//     console.log(Users.infoRow);\r\n//     document.getElementById('plan')!.innerText = Users.infoRow.plan;\r\n//     document.getElementById('materia')!.innerText = Users.infoRow.nombreMateria;\r\n//     document.getElementById('salon')!.innerText = Users.infoRow.salon;\r\n// }\r\n// async function initialLoad() {\r\n//     const hour = (<HTMLInputElement>document.getElementById('horaFiltro')).value;\r\n//     const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;\r\n//     const url = `&hora=${hour}&plan=${plan}`;\r\n//     const assignatures = await getAssignatures(1, 'ASC', 'nombreMateria', url);\r\n//     const header = [\r\n//         { text: 'Materia', columnNameDB: 'nombreMateria', idHeader: 'nameAssignature', attributeToPrint: 'nombreMateria', sortable: true, sortThis: true },\r\n//         { text: 'Salon', columnNameDB: 'salon', idHeader: 'assignatureRoom', attributeToPrint: 'salon', sortable: true }\r\n//     ]\r\n//     const sort: Sort = {\r\n//         sqlSort: true,\r\n//         sortASC: true\r\n//     }\r\n//     const urlParams = {\r\n//         hora:hour,\r\n//         materia:plan\r\n//     }\r\n//     const attributes:AttributesResponse = {\r\n//         actualPage:'actualPage',\r\n//         pages:'pages',\r\n//         data:'assignatures'\r\n//     }\r\n//     const configuration: APIConfig = {\r\n//         idTable: 'users-info',\r\n//         idPagination: 'pagination-users-info',\r\n//         urlParams,\r\n//         pages: assignatures.pages,\r\n//         actualPage: assignatures.actualPage,\r\n//         rows: assignatures.assignatures,\r\n//         headerConfig: header,\r\n//         styleTable: 'default',\r\n//         sort,\r\n//         idRows: 'idAssignature',\r\n//         cbSelection:printTest,\r\n//         paginationFn:fetchFn,\r\n//         attributesResponse:attributes\r\n//     }\r\n//     Users = new DefaultTable(configuration);\r\n//     Users.printTable();\r\n//     Users.printPagination();\r\n//     document.getElementById('filtro')!.addEventListener('submit',(e)=>{\r\n//         e.preventDefault();\r\n//         const text = (<HTMLInputElement>document.getElementById('materiaBusqueda')).value;\r\n//         if(text!==''){\r\n//             Users.setURLQuerys({\r\n//                 busqueda:text\r\n//             });\r\n//             Users.view();\r\n//             return;\r\n//         }\r\n//         const hora = (<HTMLInputElement>document.getElementById('horaFiltro')).value;\r\n//         const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;\r\n//         Users.setURLQuerys({\r\n//             hora,\r\n//             materia:plan\r\n//         });\r\n//     })\r\n// }\r\n// initialLoad();\r\n// async function fetchFn(page:number,order:string,column:string,urlQuery?:string){\r\n//     const hour = (<HTMLInputElement>document.getElementById('horaFiltro')).value;\r\n//     const plan = (<HTMLInputElement>document.getElementById('planFiltro')).value;\r\n//     const url = `&hora=${hour}&plan=${plan}`;\r\n//     const result = await getAssignatures(page,order,column,url);\r\n//     const da = await result;\r\n//     return da;    \r\n// }\r\n\n\n//# sourceURL=webpack://js-smart-table/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;