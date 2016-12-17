import { Injectable } from '@angular/core'
import { Location } from '@angular/common'

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
    
    constructor (
        location: Location)
    {}

    initBonitaConfig() {
        
        if (location.hostname != 'localhost') {
            this.buildExternalConfig()
        }

    }

    private buildExternalConfig() {
        this.hostUrl = location.origin;    
        this.baseUrl = this.hostUrl + this.basePath;
        this.apiUrl = this.baseUrl + this.apiPath;
        this.fileUploadUrl = this.baseUrl + this.fileUploadPath;
    }

}