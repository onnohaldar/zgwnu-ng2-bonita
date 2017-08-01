import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaProcessDefinition } from './zgwnu-bonita-process-definition'

export class ZgwnuBonitaProcessDefinitionMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let processDefinitionData = new ZgwnuBonitaProcessDefinition(res.json())
        return processDefinitionData
    }

    mapResponseArray(res: Response) {
        let processDefinitionDataArray: ZgwnuBonitaProcessDefinition[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { processDefinitionDataArray.push(new ZgwnuBonitaProcessDefinition(body)) }
        return processDefinitionDataArray
    }

}