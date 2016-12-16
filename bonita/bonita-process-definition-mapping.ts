import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from './bonita-data-mapping.interface'
import { BonitaProcessDefinition } from './bonita-process-definition'

export class BonitaProcessDefinitionMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let processDefinitionData = new BonitaProcessDefinition(res.json())
        return processDefinitionData
    }

    mapResponseArray(res: Response) {
        let processDefinitionDataArray: BonitaProcessDefinition[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { processDefinitionDataArray.push(new BonitaProcessDefinition(body)) }
        return processDefinitionDataArray
    }

}