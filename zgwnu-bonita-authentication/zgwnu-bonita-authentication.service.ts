// ZaakgerichtWerken.nu Bonita Rest Api Authentication Service
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

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaCredentials } from './zgwnu-bonita-credentials'
import { ZgwnuBonitaSession } from './zgwnu-bonita-session'
import { ZgwnuBonitaSessionMapping } from './zgwnu-bonita-session-mapping'
import { ZgwnuBonitaResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-response'
import { ZgwnuBonitaErrorResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-error-response'

@Injectable()
export class ZgwnuBonitaAuthenticationService extends ZgwnuBonitaRestApiService {
    private readonly LOGIN_SERVICE_PATH: string = '/loginservice'
    private readonly CURRENT_SESSION_RESOURCE_PATH = '/system/session/unusedid'

    successResponse: ZgwnuBonitaResponse
    errorResponse: ZgwnuBonitaErrorResponse

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http,
        private router: Router)
    { 
        super()
    }

    private executeLogin(creds: ZgwnuBonitaCredentials): Observable<ZgwnuBonitaResponse> {
        let credsUrlEncoded: string = 'username=' + creds.username + '&password=' + creds.password + '&redirect=false'
        let headers: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        let options: RequestOptions = new RequestOptions({ headers: headers })
        let postUrl: string = this.configService.baseUrl + this.LOGIN_SERVICE_PATH

        return this.http.post(postUrl, credsUrlEncoded, options)
                        .map(this.mapSuccessResponse)
                        .catch(this.handleResponseError)
    }

    getCurrentSession(): Observable<ZgwnuBonitaSession> {
        let sessionMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaSessionMapping()
        return this.http.get(this.configService.apiUrl + this.CURRENT_SESSION_RESOURCE_PATH, this.configService.options)
                .map(sessionMapping.mapResponse)
                .catch(this.handleResponseError)

    }

    login(creds: ZgwnuBonitaCredentials) {
        this.executeLogin(creds)
            .subscribe(
                successResponse => {
                    this.successResponse = successResponse
                    this.getCurrentSession()
                        .subscribe(
                            session => {
                                 if (creds.username == session.user_name) {
                                     this.configService.session = session
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