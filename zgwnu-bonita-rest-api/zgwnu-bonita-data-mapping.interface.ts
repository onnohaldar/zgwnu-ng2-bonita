import { Response } from '@angular/http'

export interface ZgwnuBonitaDataMappingInterface {
    mapResponse(response: Response): any
    mapResponseArray(response: Response): any
}