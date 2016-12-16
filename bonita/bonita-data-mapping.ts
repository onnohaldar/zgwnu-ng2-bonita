import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from './bonita-data-mapping.interface'

export class BonitaDataMapping implements BonitaDataMappingInterface {

    mapResponseArray(res: Response) {
        let dataArray = res.json()
        return dataArray || [ ]
    }

    mapResponse(res: Response) {
        let dataObject = res.json()
        return dataObject || { }
    }

}
