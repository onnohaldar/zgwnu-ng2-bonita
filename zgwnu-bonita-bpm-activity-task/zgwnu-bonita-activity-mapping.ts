import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaActivity } from './zgwnu-bonita-activity'

export class ZgwnuBonitaActivityMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let activityData = new ZgwnuBonitaActivity(res.json())
        return activityData
    }

    mapResponseArray(res: Response) {
        let activityDataArray: ZgwnuBonitaActivity[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { activityDataArray.push(new ZgwnuBonitaActivity(body)) }
        return activityDataArray
    }

}