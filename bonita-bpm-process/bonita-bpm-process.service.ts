// Bonita Rest Api BPM Process Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc28
//
//
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaUtils } from '../bonita-rest-api/bonita-utils'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaSearchParms } from '../bonita-rest-api/bonita-search-parms'
import { BonitaFileUploadResponse } from '../bonita-file-upload/bonita-file-upload-response'
import { BonitaProcessDefinition } from './bonita-process-definition'
import { BonitaProcessDefinitionMapping } from './bonita-process-definition-mapping'
import { BonitaCreateCaseSuccessResponse } from './bonita-create-case-success-response'
import { BonitaDeployProcessDefinitionSuccessResponse } from './bonita-deploy-process-definition-success-response'

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

    // Deploy a process definition
    //
    // based on: http://documentation.bonitasoft.com/?page=bpm-api#toc28
    //
    // Post URL template: ../API/bpm/process
    //
    deployProcessDefinition(processUploadResponse: BonitaFileUploadResponse): Observable<BonitaDeployProcessDefinitionSuccessResponse> {
        let requestPayload: any = { "fileupload": processUploadResponse.tempPath }
        return this.http.post(this.resourceUrl, requestPayload, this.configService.sendOptions)
                        .map(this.mapDeployProcessDefinitionSuccessResponse)
                        .catch(this.handleResponseError)
    }

    private mapDeployProcessDefinitionSuccessResponse(res: Response) {
        let utils: BonitaUtils = new BonitaUtils()
        let successResponse = new BonitaDeployProcessDefinitionSuccessResponse()
        successResponse.status = res.status
        successResponse.statusText = res.statusText
        let body: any = res.json()
        successResponse.id = body.id
        successResponse.deploymentDate = utils.getDateValue(body.deploymentDate)
        successResponse.description = body.description
        successResponse.activationState = body.activationState
        successResponse.name = body.name
        successResponse.displayName = body.displayName
        successResponse.actorinitiatorid = body.actorinitiatorid
        successResponse.last_update_date = utils.getDateValue(body.last_update_date)
        successResponse.configurationState = body.configurationState
        successResponse.version = body.version
        return successResponse
    }

}