import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaTask } from './zgwnu-bonita-task'

export class ZgwnuBonitaTaskMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let taskData = new ZgwnuBonitaTask(res.json())
        return taskData
    }

    mapResponseArray(res: Response) {
        let taskDataArray: ZgwnuBonitaTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { taskDataArray.push(new ZgwnuBonitaTask(body)) }
        return taskDataArray
    }

}