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

import { BonitaRestApiService } from './bonita-rest-api.service'
import { BonitaDataMappingInterface } from './bonita-data-mapping.interface'
import { BonitaConfigService } from './bonita-config.service'
import { BonitaCredentials } from './bonita-credentials'
import { BonitaSession } from './bonita-session'
import { BonitaSessionMapping } from './bonita-session-mapping'
import { BonitaResponse } from './bonita-response'
import { BonitaErrorResponse } from './bonita-error-response'

@Injectable()
export class BonitaAuthenticationService extends BonitaRestApiService {

    successResponse: BonitaResponse
    errorResponse: BonitaErrorResponse

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http,
        private router: Router)
    { 
        super()
    }

    session: BonitaSession

    private executeLogin(creds: BonitaCredentials): Observable<BonitaResponse> {
        let credsUrlEncoded: string = 'username=' + creds.username + '&password=' + creds.password + '&redirect=false'
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        let options: RequestOptions = new RequestOptions({ headers: headers })
        let postUrl: string = this.bonitaConfigService.baseUrl + '/loginservice'

        return this.http.post(postUrl, credsUrlEncoded, options)
                        .map(this.mapSuccessResponse)
                        .catch(this.handleResponseError)
    }

    getSession(): Observable<BonitaSession> {
        let sessionMapping: BonitaDataMappingInterface = new BonitaSessionMapping()
        return this.http.get(this.bonitaConfigService.apiUrl + '/system/session/unusedid')
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
                                console.log('login.getSession()')
                                console.log(session)
                                 if (creds.username == session.user_name) {
                                     this.session = session
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