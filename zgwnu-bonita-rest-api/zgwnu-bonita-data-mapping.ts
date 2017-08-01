import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from './zgwnu-bonita-data-mapping.interface'

export class ZgwnuBonitaDataMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponseArray(res: Response) {
        let dataArray = res.json()
        return dataArray || [ ]
    }

    mapResponse(res: Response) {
        let dataObject = res.json()
        return dataObject || { }
    }

}
