import { Response } from '@angular/http'

import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaDocument } from './zgwnu-bonita-document'

export class ZgwnuBonitaDocumentMapping implements ZgwnuBonitaDataMappingInterface {

    mapResponse(res: Response) {
        let documentData = new ZgwnuBonitaDocument(res.json())
        return documentData
    }

    mapResponseArray(res: Response) {
        let documentDataArray: ZgwnuBonitaDocument[] = []
        let bodyArray: any[] = res.json()
        for (let body of bodyArray) { documentDataArray.push(new ZgwnuBonitaDocument(body)) }
        return documentDataArray
    }

}