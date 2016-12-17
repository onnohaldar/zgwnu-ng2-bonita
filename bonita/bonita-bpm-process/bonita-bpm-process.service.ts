// Bonita Rest Api BPM Process Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc27
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
import { BonitaProcessDefinition } from './bonita-process-definition'
import { BonitaProcessDefinitionMapping } from './bonita-process-definition-mapping'
import { BonitaCreateCaseSuccessResponse } from './bonita-create-case-success-response'

@Injectable()
export class BonitaBpmProcessService extends BonitaRestApiService {
    private resourcePath: string = '/bpm/process'
    private resourceUrl: string

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        console.log('BonitaBpmProcessService')
        this.resourceUrl = bonitaConfigService.apiUrl + this.resourcePath
        console.log('resourceUrl = ' + this.resourceUrl)
        this.mapping = new BonitaProcessDefinitionMapping()
    }

    searchProcessDefinitions(searchParms: BonitaSearchParms): Observable<BonitaProcessDefinition[]> {
        return this.http.get(this.buildSearchRequest(searchParms))
                        .map(this.mapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: BonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getProcessDefinition(processDefinitionId: string): Observable<BonitaProcessDefinition> {
        return this.http.get(this.resourceUrl + '/' + processDefinitionId)
                        .map(this.mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    // Start a process using an instantiation contract
    //
    // based on: http://documentation.bonitasoft.com/?page=bpm-api#toc23
    //
    // Post URL template: ../API/bpm/process/:processId/instantiation
    //
    createCase(processId: string, contractValues: any): Observable<BonitaCreateCaseSuccessResponse> {
        let postUrl = this.resourceUrl + '/' + processId + '/instantiation'
        console.log('postUrl = ' + postUrl)
        return this.http.post(postUrl, contractValues, this.options)
                        .map(this.mapCreateCaseSuccessResponse)
                        .catch(this.handleResponseError)
    }

    private mapCreateCaseSuccessResponse(res: Response) {
        let successResponse = new BonitaCreateCaseSuccessResponse()
        successResponse.status = res.status
        successResponse.statusText = res.statusText
        successResponse.caseId = res.json().caseId
        return successResponse
    }

}