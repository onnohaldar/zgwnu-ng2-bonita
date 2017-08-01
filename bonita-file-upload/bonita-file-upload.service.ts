// Bonita Rest Api File Upload Service
// --------------------------------------------------------------------------
//
// based on: http://documentation.bonitasoft.com/?page=manage-files-using-upload-servlet-and-rest-api
//         : http://stackoverflow.com/questions/36352405/file-upload-with-angular2-to-rest-api
//
//
// To-Do:
// (1) map uploadFile Success Response to BonitaContractInputFile
//     including File Content-Type etc...
//
import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaFileUploadResponse } from './bonita-file-upload-response'

@Injectable()
export class BonitaFileUploadService extends BonitaRestApiService {

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
    }

    uploadFile(file: File, fileId: string): Observable<BonitaFileUploadResponse> {
        return this.servletUploadFile(this.bonitaConfigService.fileUploadUrl, file, fileId)
    }

    uploadProcess(file: File, fileId: string): Observable<BonitaFileUploadResponse> {
        return this.servletUploadFile(this.bonitaConfigService.processUploadUrl, file, fileId)
    }

    uploadOrganization(file: File, fileId: string): Observable<BonitaFileUploadResponse> {
        return this.servletUploadFile(this.bonitaConfigService.organizationUploadUrl, file, fileId)
    }

    uploadActors(file: File, fileId: string): Observable<BonitaFileUploadResponse> {
        return this.servletUploadFile(this.bonitaConfigService.actorsUploadUrl, file, fileId)
    }

    uploadImage(file: File, fileId: string): Observable<BonitaFileUploadResponse> {
        return this.servletUploadFile(this.bonitaConfigService.imageUploadUrl, file, fileId)
    }

    private servletUploadFile(servletUrl: string, file: File, fileId: string): Observable<BonitaFileUploadResponse> {
        let formData: FormData = new FormData()
        formData.append(fileId, file, file.name)
        //let uploadHeaders: Headers = new Headers({ 'Accept': 'application/json' })
        let uploadHeaders: Headers = new Headers()
        let uploadOptions: RequestOptions = new RequestOptions({ headers: uploadHeaders })
        this.bonitaConfigService.appendSessionOptions(uploadOptions)
        return this.http.post(servletUrl, formData, uploadOptions)
                        .map(this.mapFileUploadResponse)
                        .catch(this.handleResponseError)
    }

    private mapFileUploadResponse(res: any) {
        let fileUploadResponse: BonitaFileUploadResponse = new BonitaFileUploadResponse()
        fileUploadResponse.status = res.status
        fileUploadResponse.statusText = res.statusText
        fileUploadResponse.tempPath = res._body
        return fileUploadResponse
    }

}