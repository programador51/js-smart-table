import { getAssignatures } from './helpers/api';

import { tableConfiguration } from './types';

class SmartTable{

    protected tableConfiguration:tableConfiguration;

    constructor(tableConfiguration:tableConfiguration){
        this.tableConfiguration = tableConfiguration;
    }

    view(){
        console.log(this.tableConfiguration);
    }
}

const configuration = {
    idTable:'users-info'
}

const Users = new SmartTable(configuration);
Users.view();