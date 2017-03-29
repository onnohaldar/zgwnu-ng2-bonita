import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaUserTask } from './bonita-user-task'

export class BonitaUserTaskMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let userTaskData = new BonitaUserTask(res.json())
        return userTaskData
    }

    mapResponseArray(res: Response) {
        let userTaskDataArray: BonitaUserTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { userTaskDataArray.push(new BonitaUserTask(body)) }
        return userTaskDataArray
    }

}