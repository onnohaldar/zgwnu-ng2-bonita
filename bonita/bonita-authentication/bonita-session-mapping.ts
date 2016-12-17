import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaSession } from './bonita-session'

export class BonitaSessionMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let sessionData = new BonitaSession(res.json())
        return sessionData
    }

    mapResponseArray(res: Response) {
        let sessionDataDataArray: BonitaSession[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { sessionDataDataArray.push(new BonitaSession(body)) }
        return sessionDataDataArray
    }

}