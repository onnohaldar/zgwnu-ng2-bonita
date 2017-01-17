import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaSession } from './bonita-session'


export class BonitaSessionMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let body = res.json()
        let headers = res.headers
        let sessionData: BonitaSession = new BonitaSession(body, headers)
        return sessionData
    }

    mapResponseArray(res: Response) {
        return this.mapResponse(res)
    }

}