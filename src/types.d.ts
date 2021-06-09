export type HeaderTable = {
    text:string,
    columnNameDB:string,
    idHeader:string,
    css?:string,
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

export type Sort = {
    column:string,
    order:string,
    
}

export type tableConfiguration = {
    idTable:string
}