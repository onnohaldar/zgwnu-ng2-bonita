import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaHumanTask } from './bonita-human-task'

export class BonitaHumanTaskMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let humanTaskData = new BonitaHumanTask(res.json())
        return humanTaskData
    }

    mapResponseArray(res: Response) {
        let humanTaskDataArray: BonitaHumanTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { humanTaskDataArray.push(new BonitaHumanTask(body)) }
        return humanTaskDataArray
    }

}