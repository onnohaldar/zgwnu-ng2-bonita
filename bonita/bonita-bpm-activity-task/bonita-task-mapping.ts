import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaTask } from './bonita-task'

export class BonitaTaskMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let taskData = new BonitaTask(res.json())
        return taskData
    }

    mapResponseArray(res: Response) {
        let taskDataArray: BonitaTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { taskDataArray.push(new BonitaTask(body)) }
        return taskDataArray
    }

}