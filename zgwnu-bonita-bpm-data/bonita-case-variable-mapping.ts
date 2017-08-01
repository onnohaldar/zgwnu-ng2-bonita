import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaCaseVariable } from './bonita-case-variable'

export class BonitaCaseVariableMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let caseVariableData = new BonitaCaseVariable(res.json())
        return caseVariableData
    }

    mapResponseArray(res: Response) {
        let caseVariableDataArray: BonitaCaseVariable[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { caseVariableDataArray.push(new BonitaCaseVariable(body)) }
        return caseVariableDataArray
    }

}