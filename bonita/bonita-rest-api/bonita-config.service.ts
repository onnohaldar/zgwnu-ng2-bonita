import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Headers, RequestOptions } from '@angular/http'

import { BonitaSession } from '../bonita-authentication/bonita-session'

@Injectable()
export class BonitaConfigService {
    // default zgwnu Business Data Model Package configuration
    businessDataModelPackage: string = 'com.zaakgerichtwerkennu.model'

    // default bonita path configuration
    private basePath: string = '/bonita'
    private apiPath: string = '/API'
    private fileUploadPath: string = '/portal/fileUpload'
    
    // default local server configuration
    hostUrl: string = 'http://localhost:8080' 
    baseUrl: string = this.hostUrl + this.basePath
    apiUrl: string = this.baseUrl + this.apiPath
    fileUploadUrl: string = this.baseUrl + this.fileUploadPath

    // rest api options
    readonly bonitaSessionTokenKey: string = 'X-Bonita-API-Token'
    headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    options: RequestOptions = new RequestOptions({ headers: this.headers })
    sendOptions: RequestOptions = new RequestOptions({ headers: this.headers })

    // current session
    session: BonitaSession

    constructor (
        location: Location)
    {
    }

    initialize() {
        
        if (location.hostname != 'localhost') {
            this.initExternalUrls()
        }

    }

    private initExternalUrls() {
        this.hostUrl = location.origin;    
        this.baseUrl = this.hostUrl + this.basePath;
        this.apiUrl = this.baseUrl + this.apiPath;
        this.fileUploadUrl = this.baseUrl + this.fileUploadPath;
    }

    initSendOptions() {
        this.appendConfigSendOptions(this.sendOptions)
    }

    appendConfigSendOptions(options: RequestOptions) {
        if (this.session) {
            if (this.session.token) {
                options.headers.append(this.bonitaSessionTokenKey, this.session.token)
            }
        } else {
            console.log('BonitaConfigService.appendConfigSendOptions WARNING: Session NOT Configured!')
        }
    }


}