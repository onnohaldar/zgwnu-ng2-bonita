import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaCase } from './zgwnu-bonita-case'

export class ZgwnuBonitaCaseMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let caseData = new ZgwnuBonitaCase(res.json())
        return caseData
    }

    mapResponseArray(res: Response) {
        let caseDataArray: ZgwnuBonitaCase[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { caseDataArray.push(new ZgwnuBonitaCase(body)) }
        return caseDataArray
    }

}