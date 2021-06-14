import { library,dom } from '@fortawesome/fontawesome-svg-core';
import { infoPagination,APIConfig } from './types';

import { faArrowRight,
    faArrowLeft,
    faAngleDoubleLeft,
    faAngleDoubleRight, 
    faExclamationCircle  }     
from '@fortawesome/free-solid-svg-icons';

library.add(faArrowLeft,
    faAngleDoubleLeft,
    faArrowRight,
    faAngleDoubleRight,
    faExclamationCircle
);

dom.watch();

export class Pagination{
    

    pollo(){
        console.log('12312312');
    }
}