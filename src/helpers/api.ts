/**
 * 
 * @param {number} page - The page requested of the information
 * @param {string} order - ASC or DESC the data
 * @param {string} columnOrdering - Which column it's gonna be counted for the sorting (must match with the column table of the table on DB)
 * @returns {object} 
 */
export const getAssignatures = async(page:number=1,order:string="ASC",columnOrdering:string="id") => {
    const query = await fetch(`http://localhost:4000/api/paso1/materias?pagina=${page}&orden=${order}&columna=${columnOrdering}`);
    const assignatures = await query.json();

    // console.log(assignatures.data);

    return assignatures.data;
}