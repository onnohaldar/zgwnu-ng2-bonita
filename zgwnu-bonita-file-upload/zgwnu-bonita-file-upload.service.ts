// ZaakgerichtWerken.nu Bonita Rest Api File Upload Service
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

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaFileUploadResponse } from './zgwnu-bonita-file-upload-response'

@Injectable()
export class ZgwnuBonitaFileUploadService extends ZgwnuBonitaRestApiService {

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()
    }

    uploadFile(file: File, fileId: string): Observable<ZgwnuBonitaFileUploadResponse> {
        return this.servletUploadFile(this.configService.fileUploadUrl, file, fileId)
    }

    uploadProcess(file: File, fileId: string): Observable<ZgwnuBonitaFileUploadResponse> {
        return this.servletUploadFile(this.configService.processUploadUrl, file, fileId)
    }

    uploadOrganization(file: File, fileId: string): Observable<ZgwnuBonitaFileUploadResponse> {
        return this.servletUploadFile(this.configService.organizationUploadUrl, file, fileId)
    }

    uploadActors(file: File, fileId: string): Observable<ZgwnuBonitaFileUploadResponse> {
        return this.servletUploadFile(this.configService.actorsUploadUrl, file, fileId)
    }

    uploadImage(file: File, fileId: string): Observable<ZgwnuBonitaFileUploadResponse> {
        return this.servletUploadFile(this.configService.imageUploadUrl, file, fileId)
    }

    private servletUploadFile(servletUrl: string, file: File, fileId: string): Observable<ZgwnuBonitaFileUploadResponse> {
        let formData: FormData = new FormData()
        formData.append(fileId, file, file.name)
        let uploadHeaders: Headers = new Headers()
        let uploadOptions: RequestOptions = new RequestOptions({ headers: uploadHeaders })
        this.configService.appendSessionOptions(uploadOptions)
        return this.http.post(servletUrl, formData, uploadOptions)
                        .map(this.mapFileUploadResponse)
                        .catch(this.handleResponseError)
    }

    private mapFileUploadResponse(res: any) {
        let fileUploadResponse: ZgwnuBonitaFileUploadResponse = new ZgwnuBonitaFileUploadResponse()
        fileUploadResponse.status = res.status
        fileUploadResponse.statusText = res.statusText
        fileUploadResponse.tempPath = res._body
        return fileUploadResponse
    }

}