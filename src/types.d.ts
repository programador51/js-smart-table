export type HeaderTable = {
    text:string,
    columnNameDB:string,
    idHeader:string
}

export type RowConfig = {
    idRow:string,
    columnsCSS:Array<string>,
    attributesToPrint:Array<string>
}

export type AttributesAPI = {
    pages:string,
    actualPage:string,
    rows:string
}