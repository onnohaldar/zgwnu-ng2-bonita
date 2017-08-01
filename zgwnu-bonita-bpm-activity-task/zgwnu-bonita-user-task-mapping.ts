import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaUserTask } from './zgwnu-bonita-user-task'

export class ZgwnuBonitaUserTaskMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let userTaskData = new ZgwnuBonitaUserTask(res.json())
        return userTaskData
    }

    mapResponseArray(res: Response) {
        let userTaskDataArray: ZgwnuBonitaUserTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { userTaskDataArray.push(new ZgwnuBonitaUserTask(body)) }
        return userTaskDataArray
    }

}