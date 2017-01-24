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
    sendOptions: RequestOptions

    // current session
    private _session: BonitaSession

    constructor (
        location: Location)
    {
        this.initialize()
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

    set session(session: BonitaSession) {
        this._session = session
        this.sendOptions = new RequestOptions({ headers: this.headers })
        this.appendConfigSendOptions(this.sendOptions)
    }

    get session() {
        return this._session
    }

    appendConfigSendOptions(options: RequestOptions) {
        if (this._session.token) {
            options.headers.append(this.bonitaSessionTokenKey, this._session.token)
        }
    }


}