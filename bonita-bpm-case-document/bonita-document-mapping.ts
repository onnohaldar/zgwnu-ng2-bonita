import { Response } from '@angular/http'

import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaDocument } from './bonita-document'

export class BonitaDocumentMapping implements BonitaDataMappingInterface {

    mapResponse(res: Response) {
        let documentData = new BonitaDocument(res.json())
        return documentData
    }

    mapResponseArray(res: Response) {
        let documentDataArray: BonitaDocument[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { documentDataArray.push(new BonitaDocument(body)) }
        return documentDataArray
    }

}