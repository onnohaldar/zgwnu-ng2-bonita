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
    private formsDocumentImagePath: string = '/portal/formsDocumentImage'
    
    // default local server configuration
    hostUrl: string = 'http://localhost:8080' 
    baseUrl: string = this.hostUrl + this.basePath
    apiUrl: string = this.baseUrl + this.apiPath
    fileUploadUrl: string = this.baseUrl + this.fileUploadPath
    formsDocumentImageUrl: string = this.baseUrl + this.formsDocumentImagePath

    // rest api options
    readonly bonitaSessionTokenKey: string = 'X-Bonita-API-Token'
    private defaultHeaders: Headers = new Headers({ 'Content-Type': 'application/json' })
    options: RequestOptions = new RequestOptions({ headers: this.defaultHeaders })
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
            this.configExternalUrls()
        }

    }

    private configExternalUrls() {
        this.hostUrl = location.origin 
        this.baseUrl = this.hostUrl + this.basePath
        this.apiUrl = this.baseUrl + this.apiPath
        this.fileUploadUrl = this.baseUrl + this.fileUploadPath
        this.formsDocumentImageUrl = this.baseUrl + this.formsDocumentImagePath
    }

    set session(session: BonitaSession) {
        this._session = session
        this.configSendOptions()
    }

    get session() {
        return this._session
    }

    private configSendOptions() {
        let defaultSendHeaders: Headers = new Headers({ 'Content-Type': 'application/json' })
        this.sendOptions = new RequestOptions({ headers: defaultSendHeaders })
        this.appendSessionOptions(this.sendOptions)
    }

    appendSessionOptions(optionsRef: RequestOptions) {
        if (this._session.token) {
            optionsRef.headers.append(this.bonitaSessionTokenKey, this._session.token)
        }
    }


}