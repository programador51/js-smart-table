// Just for testing purposes

/**
 * How must looks like the functions that fetchs data from the API
 * 
 * @async
 * @function paginationFn
 * @param {number} page - The page requested of the information
 * @param {string} order - ASC or DESC the data
 * @param {string} columnOrdering - Which column it's gonna be counted for the sorting (must match with the column table of the table on DB)
 * @param {string|undefined} additionalQuery - In case you want set more url params, you need to pass the array
 * @returns {object} 
 */
export async function getAssignatures(page:number=1,order:string="ASC",columnOrdering:string,additionalQuery?:string){
    let query;

    if(additionalQuery===undefined){
        query = await fetch(`http://localhost:4000/api/paso1/materias?pagina=${page}&orden=${order}&columna=${columnOrdering}`);
    }

    else{
        query = await fetch(`http://localhost:4000/api/paso1/materias?pagina=${page}&orden=${order}&columna=${columnOrdering}${additionalQuery}`);
    }

    const assignatures = await query.json();

    console.log(assignatures.data);

    return assignatures.data;
}


/**
 * How must look the function for the property cbSelection
 * @function cbSelection
 * @param {Event} e - Event for the clicked row.
 */
// function printAssignature(e:Event){
//     console.log(Users.infoRow);
    
//     document.getElementById('plan')!.innerText = Users.infoRow.plan;
//     document.getElementById('materia')!.innerText = Users.infoRow.nombreMateria;
//     document.getElementById('salon')!.innerText = Users.infoRow.salon;
// }