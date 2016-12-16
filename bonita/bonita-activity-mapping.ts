import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from './bonita-data-mapping.interface'
import { BonitaActivity } from './bonita-activity'

export class BonitaActivityMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let activityData = new BonitaActivity(res.json())
        return activityData
    }

    mapResponseArray(res: Response) {
        let activityDataArray: BonitaActivity[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { activityDataArray.push(new BonitaActivity(body)) }
        return activityDataArray
    }

}