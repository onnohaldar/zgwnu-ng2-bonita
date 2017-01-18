// Bonita Rest Api Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=_rest-api
//
//
import { Injectable } from '@angular/core'
import { Response, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

import { BonitaConfigService } from './bonita-config.service'
import { BonitaDataMappingInterface } from './bonita-data-mapping.interface'
import { BonitaDataMapping } from './bonita-data-mapping'
import { BonitaResponse } from './bonita-response'
import { BonitaErrorResponse } from './bonita-error-response'

@Injectable()
export abstract class BonitaRestApiService {
    
    protected headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    protected options: RequestOptions = new RequestOptions({ headers: this.headers })
    protected sendOptions: RequestOptions = new RequestOptions({ headers: this.headers })

    protected mapping: BonitaDataMappingInterface = new BonitaDataMapping()

    protected configSendOptions(configService: BonitaConfigService) {
        if (configService.sessionToken) {
            this.sendOptions.headers.append('X-Bonita-API-Token', configService.sessionToken)
        } 
    }

    protected mapSuccessResponse(res: Response) {
        let successResponse = new BonitaResponse()
        successResponse.status = res.status
        successResponse.statusText = res.statusText
        return successResponse
    }

    protected handleResponseError(error: Response | any) {
        let errorResponse = new BonitaErrorResponse()
        if (error instanceof Response) {
            errorResponse.status = error.status
            errorResponse.statusText = error.statusText
            const body = error.json()
            errorResponse.exception = body.exception
            errorResponse.message = body.message
            errorResponse.explanations = body.explanations
        } else {
            errorResponse.status = 0
            errorResponse.statusText = error.message ? error.message : error.toString()
        }
        return Observable.throw(errorResponse)
    }

}