import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaCase } from './bonita-case'

export class BonitaCaseMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let caseData = new BonitaCase(res.json())
        return caseData
    }

    mapResponseArray(res: Response) {
        let caseDataArray: BonitaCase[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { caseDataArray.push(new BonitaCase(body)) }
        return caseDataArray
    }

}