import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaHumanTask } from './zgwnu-bonita-human-task'

export class ZgwnuBonitaHumanTaskMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let humanTaskData = new ZgwnuBonitaHumanTask(res.json())
        return humanTaskData
    }

    mapResponseArray(res: Response) {
        let humanTaskDataArray: ZgwnuBonitaHumanTask[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { humanTaskDataArray.push(new ZgwnuBonitaHumanTask(body)) }
        return humanTaskDataArray
    }

}