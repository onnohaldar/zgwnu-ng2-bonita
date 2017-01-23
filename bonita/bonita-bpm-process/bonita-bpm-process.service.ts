// Bonita Rest Api BPM Process Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc27
//
//
import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions } from '@angular/http'

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
        private configService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.resourcePath
    }

    searchProcessDefinitions(searchParms: BonitaSearchParms): Observable<BonitaProcessDefinition[]> {
        let processDefinitionMapping: BonitaProcessDefinitionMapping = new BonitaProcessDefinitionMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(processDefinitionMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: BonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getProcessDefinition(processDefinitionId: string): Observable<BonitaProcessDefinition> {
        let processDefinitionMapping: BonitaProcessDefinitionMapping = new BonitaProcessDefinitionMapping()
        return this.http.get(this.resourceUrl + '/' + processDefinitionId, this.configService.options)
                        .map(processDefinitionMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    // Start a process using an instantiation contract
    //
    // based on: http://documentation.bonitasoft.com/?page=bpm-api#toc23
    //
    // Post URL template: ../API/bpm/process/:processId/instantiation
    //
    createCase(processId: string, contractValues: any): Observable<BonitaCreateCaseSuccessResponse> {
        let postUrl: string = this.resourceUrl + '/' + processId + '/instantiation'
        return this.http.post(postUrl, contractValues, this.configService.sendOptions)
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