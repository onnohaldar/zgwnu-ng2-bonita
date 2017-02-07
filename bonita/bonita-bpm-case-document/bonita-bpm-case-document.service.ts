// Bonita Rest Api BPM Case Document Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc17
//
//
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaSearchParms } from '../bonita-rest-api/bonita-search-parms'
import { BonitaDocument } from './bonita-document'
import { BonitaDocumentMapping } from './bonita-document-mapping'
import { BonitaDocumentCreateInput } from './bonita-document-create-input'
import { BonitaDocumentUpdateInput } from './bonita-document-update-input'

@Injectable()
export class BonitaBpmDocumentService extends BonitaRestApiService {
    private resourcePath: string = '/bpm/caseDocument'
    private resourceUrl: string

    constructor(
        private configService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.resourcePath
    }

    createDocument(documentCreateInput: BonitaDocumentCreateInput): Observable<BonitaDocument> {
        let documentMapping: BonitaDocumentMapping = new BonitaDocumentMapping()
        let postUrl: string = this.resourceUrl
        return this.http.post(postUrl, documentCreateInput, this.configService.sendOptions)
                        .map(documentMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    updateDocument(documentId: string, documentUpdateInput: BonitaDocumentUpdateInput): Observable<BonitaDocument> {
        let documentMapping: BonitaDocumentMapping = new BonitaDocumentMapping()
        let putUrl: string = this.resourceUrl
        return this.http.put(this.resourceUrl + '/' + documentId, documentUpdateInput, this.configService.sendOptions)
                        .map(documentMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    getDocument(documentId: string): Observable<BonitaDocument> {
        let documentMapping: BonitaDocumentMapping = new BonitaDocumentMapping()
        return this.http.get(this.resourceUrl + '/' + documentId, this.configService.options)
                        .map(documentMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    searchDocuments(searchParms: BonitaSearchParms): Observable<BonitaDocument[]> {
        let documentMapping: BonitaDocumentMapping = new BonitaDocumentMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(documentMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: BonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

}