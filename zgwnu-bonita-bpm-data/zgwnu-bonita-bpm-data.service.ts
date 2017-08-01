// ZaakgerichtWerken.nu Bonita Rest Api BPM Data Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc13
//
//
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaSearchParms } from '../zgwnu-bonita-rest-api/zgwnu-bonita-search-parms'
import { ZgwnuBonitaCaseVariable } from './zgwnu-bonita-case-variable'
import { ZgwnuBonitaCaseVariableMapping } from './zgwnu-bonita-case-variable-mapping'


@Injectable()
export class ZgwnuBonitaBpmDataService extends ZgwnuBonitaRestApiService {
    private caseVariableResourcePath: string = '/bpm/caseVariable'
    private caseVariableResourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        
        // configure resource url
        this.caseVariableResourceUrl = configService.apiUrl + this.caseVariableResourcePath
    }

    // CaseVariable
    //
    // based on http://documentation.bonitasoft.com/?page=bpm-api#toc15
    //
    //
    getCaseVariable(caseId: string, variableName: string): Observable<ZgwnuBonitaCaseVariable> {
        let caseVariableMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaCaseVariableMapping()
        return this.http.get(this.caseVariableResourceUrl + '/' + caseId + '/' + variableName, this.configService.options)
                        .map(caseVariableMapping.mapResponse)
                        .catch(this.handleResponseError)
    }
    
    searchCaseVariables(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaCaseVariable[]> {
        let caseVariableMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaCaseVariableMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(caseVariableMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.caseVariableResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

}