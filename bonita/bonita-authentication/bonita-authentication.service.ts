// Bonita Rest Api Authentication Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=rest-api-overview#toc2
//
//
import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaCredentials } from './bonita-credentials'
import { BonitaSession } from './bonita-session'
import { BonitaSessionMapping } from './bonita-session-mapping'
import { BonitaResponse } from '../bonita-rest-api/bonita-response'
import { BonitaErrorResponse } from '../bonita-rest-api/bonita-error-response'

@Injectable()
export class BonitaAuthenticationService extends BonitaRestApiService {

    successResponse: BonitaResponse
    errorResponse: BonitaErrorResponse

    constructor(
        private configService: BonitaConfigService,
        private http: Http,
        private router: Router)
    { 
        super()
    }

    private executeLogin(creds: BonitaCredentials): Observable<BonitaResponse> {
        let credsUrlEncoded: string = 'username=' + creds.username + '&password=' + creds.password + '&redirect=false'
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        let options: RequestOptions = new RequestOptions({ headers: headers })
        let postUrl: string = this.configService.baseUrl + '/loginservice'

        return this.http.post(postUrl, credsUrlEncoded, options)
                        .map(this.mapSuccessResponse)
                        .catch(this.handleResponseError)
    }

    getSession(): Observable<BonitaSession> {
        let sessionMapping: BonitaDataMappingInterface = new BonitaSessionMapping()
        return this.http.get(this.configService.apiUrl + '/system/session/unusedid', this.configService.options)
                .map(sessionMapping.mapResponse)
                .catch(this.handleResponseError)

    }

    login(creds: BonitaCredentials) {
        this.executeLogin(creds)
            .subscribe(
                successResponse => {
                    this.successResponse = successResponse
                    this.getSession()
                        .subscribe(
                            session => {
                                 if (creds.username == session.user_name) {
                                     this.configService.session = session
                                     this.configService.initSendOptions()
                                     if (creds.navigateTo) { this.router.navigate([creds.navigateTo]) }
                                 }
                            },
                            errorResponse => this.errorResponse = errorResponse
                        )    
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

}