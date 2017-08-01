// ZaakgerichtWerken.nu Bonita Rest Api BPM Process Service
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

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaUtils } from '../zgwnu-bonita-rest-api/zgwnu-bonita-utils'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaSearchParms } from '../zgwnu-bonita-rest-api/zgwnu-bonita-search-parms'
import { ZgwnuBonitaFileUploadResponse } from '../zgwnu-bonita-file-upload/zgwnu-bonita-file-upload-response'
import { ZgwnuBonitaProcessDefinition } from './zgwnu-bonita-process-definition'
import { ZgwnuBonitaProcessDefinitionMapping } from './zgwnu-bonita-process-definition-mapping'
import { ZgwnuBonitaCreateCaseSuccessResponse } from './zgwnu-bonita-create-case-success-response'
import { ZgwnuBonitaDeployProcessDefinitionSuccessResponse } from './zgwnu-bonita-deploy-process-definition-success-response'

@Injectable()
export class ZgwnuBonitaBpmProcessService extends ZgwnuBonitaRestApiService {
    private readonly RESOURCE_PATH: string = '/bpm/process'
    private resourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()

        // configure resource urls
        this.resourceUrl = configService.apiUrl + this.RESOURCE_PATH
    }

    searchProcessDefinitions(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaProcessDefinition[]> {
        let processDefinitionMapping: ZgwnuBonitaProcessDefinitionMapping = new ZgwnuBonitaProcessDefinitionMapping()
        return this.http.get(this.buildSearchRequest(searchParms), this.configService.options)
                        .map(processDefinitionMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildSearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.resourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getProcessDefinition(processDefinitionId: string): Observable<ZgwnuBonitaProcessDefinition> {
        let processDefinitionMapping: ZgwnuBonitaProcessDefinitionMapping = new ZgwnuBonitaProcessDefinitionMapping()
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
    createCase(processId: string, contractValues: any): Observable<ZgwnuBonitaCreateCaseSuccessResponse> {
        let postUrl: string = this.resourceUrl + '/' + processId + '/instantiation'
        return this.http.post(postUrl, contractValues, this.configService.sendOptions)
                        .map(this.mapCreateCaseSuccessResponse)
                        .catch(this.handleResponseError)
    }

    private mapCreateCaseSuccessResponse(res: Response) {
        let successResponse = new ZgwnuBonitaCreateCaseSuccessResponse()
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
    deployProcessDefinition(processUploadResponse: ZgwnuBonitaFileUploadResponse): Observable<ZgwnuBonitaDeployProcessDefinitionSuccessResponse> {
        let requestPayload: any = { "fileupload": processUploadResponse.tempPath }
        return this.http.post(this.resourceUrl, requestPayload, this.configService.sendOptions)
                        .map(this.mapDeployProcessDefinitionSuccessResponse)
                        .catch(this.handleResponseError)
    }

    private mapDeployProcessDefinitionSuccessResponse(res: Response) {
        let utils: ZgwnuBonitaUtils = new ZgwnuBonitaUtils()
        let successResponse = new ZgwnuBonitaDeployProcessDefinitionSuccessResponse()
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