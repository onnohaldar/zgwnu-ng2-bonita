import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { Headers, RequestOptions } from '@angular/http'

import { ZgwnuBonitaSession } from '../zgwnu-bonita-authentication/zgwnu-bonita-session'

@Injectable()
export class ZgwnuBonitaConfigService {
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
    private _session: ZgwnuBonitaSession

    constructor (
        location: Location)
    {
        this.initialize()
    }

    initialize() {
        
        if (location.hostname == 'localhost') {
            // local development server configuration (Bonita Studio with Angular JIT)
            this.hostUrl = 'http://localhost:8080' 
        } else {
            // external test or production server configuration (Bonita Platform with AOT WAR deployment)
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

    set session(session: ZgwnuBonitaSession) {
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