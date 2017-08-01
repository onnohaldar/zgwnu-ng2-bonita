import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaCaseVariable } from './zgwnu-bonita-case-variable'

export class ZgwnuBonitaCaseVariableMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let caseVariableData = new ZgwnuBonitaCaseVariable(res.json())
        return caseVariableData
    }

    mapResponseArray(res: Response) {
        let caseVariableDataArray: ZgwnuBonitaCaseVariable[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { caseVariableDataArray.push(new ZgwnuBonitaCaseVariable(body)) }
        return caseVariableDataArray
    }

}