// Bonita Rest Api BPM Data Service
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

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaSearchParms } from '../bonita-rest-api/bonita-search-parms'
import { BonitaCaseVariable } from './bonita-case-variable'
import { BonitaCaseVariableMapping } from './bonita-case-variable-mapping'


@Injectable()
export class BonitaBpmDataService extends BonitaRestApiService {
    private caseVariableResourcePath: string = '/bpm/caseVariable'
    private caseVariableResourceUrl: string

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        
        // configure resource url
        this.caseVariableResourceUrl = bonitaConfigService.apiUrl + this.caseVariableResourcePath
    }

    // CaseVariable
    //
    // based on http://documentation.bonitasoft.com/?page=bpm-api#toc15
    //
    //
    getCaseVariable(caseId: string, variableName: string): Observable<BonitaCaseVariable> {
        let caseVariableMapping: BonitaDataMappingInterface = new BonitaCaseVariableMapping()
        return this.http.get(this.caseVariableResourceUrl + '/' + caseId + '/' + variableName)
                        .map(caseVariableMapping.mapResponse)
                        .catch(this.handleResponseError)
    }
    
    searchCaseVariables(searchParms: BonitaSearchParms): Observable<BonitaCaseVariable[]> {
        let caseVariableMapping: BonitaDataMappingInterface = new BonitaCaseVariableMapping()
        return this.http.get(this.buildSearchRequest(searchParms))
                        .map(caseVariableMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: BonitaSearchParms): string {
        return this.caseVariableResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

}