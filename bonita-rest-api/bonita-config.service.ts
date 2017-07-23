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
    private processUploadPath: string = '/portal/processUpload'
    private organizationUploadPath: string = '/portal/organizationUpload'
    private actorsUploadPath: string = '/portal/actorsUpload'
    private imageUploadPath: string = '/portal/imageUpload'
    private formsDocumentImagePath: string = '/portal/formsDocumentImage'
    
    // server configuration urls
    hostUrl: string 
    baseUrl: string
    apiUrl: string
    fileUploadUrl: string
    processUploadUrl: string
    organizationUploadUrl: string
    actorsUploadUrl: string
    imageUploadUrl: string
    formsDocumentImageUrl: string

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
        
        if (location.hostname == 'localhost') {
            // local development server configuration
            this.hostUrl = 'http://localhost:8080' 
        } else {
            // external test or production server configuration
            this.hostUrl = location.origin
        }

        this.configUrls()

    }

    private configUrls() {
        this.baseUrl = this.hostUrl + this.basePath
        this.apiUrl = this.baseUrl + this.apiPath
        this.fileUploadUrl = this.baseUrl + this.fileUploadPath
        this.processUploadUrl = this.baseUrl + this.processUploadPath
        this.organizationUploadUrl = this.baseUrl + this.organizationUploadPath
        this.actorsUploadUrl = this.baseUrl + this.actorsUploadPath
        this.imageUploadUrl = this.baseUrl + this.imageUploadPath
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