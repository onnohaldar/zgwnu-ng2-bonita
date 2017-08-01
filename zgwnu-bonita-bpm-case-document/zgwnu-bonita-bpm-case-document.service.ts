// ZaakgerichtWerken.nu Bonita Rest Api BPM Case Document Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc17
//
//
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaSearchParms } from '../zgwnu-bonita-rest-api/zgwnu-bonita-search-parms'
import { ZgwnuBonitaDocument } from './zgwnu-bonita-document'
import { ZgwnuBonitaDocumentMapping } from './zgwnu-bonita-document-mapping'
import { ZgwnuBonitaDocumentCreateInput } from './zgwnu-bonita-document-create-input'
import { ZgwnuBonitaDocumentUpdateInput } from './zgwnu-bonita-document-update-input'

@Injectable()
export class ZgwnuBonitaBpmCaseDocumentService extends ZgwnuBonitaRestApiService {
    private resourcePath: string = '/bpm/caseDocument'
    private resourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http, 
        private sanitizer: DomSanitizer, 
    ) 
    { 
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.resourcePath
    }

    createDocument(documentCreateInput: ZgwnuBonitaDocumentCreateInput): Observable<ZgwnuBonitaDocument> {
        let documentMapping: ZgwnuBonitaDocumentMapping = new ZgwnuBonitaDocumentMapping()
        return this.http.post(this.resourceUrl, documentCreateInput, this.configService.sendOptions)
                        .map(documentMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    updateDocument(documentId: string, documentUpdateInput: ZgwnuBonitaDocumentUpdateInput): Observable<ZgwnuBonitaDocument> {
        let documentMapping: ZgwnuBonitaDocumentMapping = new ZgwnuBonitaDocumentMapping()
        return this.http.put(this.resourceUrl + '/' + documentId, documentUpdateInput, this.configService.sendOptions)
                        .map(documentMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    getDocument(documentId: string): Observable<ZgwnuBonitaDocument> {
        let documentMapping: ZgwnuBonitaDocumentMapping = new ZgwnuBonitaDocumentMapping()
        return this.http.get(this.resourceUrl + '/' + documentId, this.configService.options)
                        .map(documentMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    searchDocuments(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaDocument[]> {
        let documentMapping: ZgwnuBonitaDocumentMapping = new ZgwnuBonitaDocumentMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(documentMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getSafeFormsDocumentImageUrl(documentId: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            this.configService.formsDocumentImageUrl + "?document=" + documentId)
    }

}