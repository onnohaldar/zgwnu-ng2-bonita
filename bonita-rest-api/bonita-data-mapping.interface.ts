import { Response } from '@angular/http'

export interface BonitaDataMappingInterface {
    mapResponse(response: Response): any
    mapResponseArray(response: Response): any
}