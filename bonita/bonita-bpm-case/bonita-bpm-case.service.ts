// Bonita Rest Api BPM Case (Process Instance) Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc23
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
import { BonitaCase } from './bonita-case'
import { BonitaCaseMapping } from './bonita-case-mapping'

@Injectable()
export class BonitaBpmCaseService extends BonitaRestApiService {
    private resourcePath: string = '/bpm/case'
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

    searchCases(searchParms: BonitaSearchParms): Observable<BonitaCase[]> {
        let caseMapping: BonitaCaseMapping = new BonitaCaseMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(caseMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: BonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getCase(caseId: string): Observable<BonitaCase> {
        let caseMapping: BonitaCaseMapping = new BonitaCaseMapping()
        return this.http.get(this.resourceUrl + '/' + caseId, this.configService.options)
                        .map(caseMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    getCaseContext(caseId: string): Observable<any> {
        return this.http.get(this.resourceUrl + '/' + caseId + '/context', this.configService.options)
                        .map(this.mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}