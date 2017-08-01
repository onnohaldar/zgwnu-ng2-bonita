// ZaakgerichtWerken.nu Bonita Rest Api BPM Case (Process Instance) Service
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

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaSearchParms } from '../zgwnu-bonita-rest-api/zgwnu-bonita-search-parms'
import { ZgwnuBonitaCase } from './zgwnu-bonita-case'
import { ZgwnuBonitaCaseMapping } from './zgwnu-bonita-case-mapping'

@Injectable()
export class ZgwnuBonitaBpmCaseService extends ZgwnuBonitaRestApiService {
    private resourcePath: string = '/bpm/case'
    private resourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.resourcePath
    }

    searchCases(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaCase[]> {
        let caseMapping: ZgwnuBonitaCaseMapping = new ZgwnuBonitaCaseMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(caseMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getCase(caseId: string): Observable<ZgwnuBonitaCase> {
        let caseMapping: ZgwnuBonitaCaseMapping = new ZgwnuBonitaCaseMapping()
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