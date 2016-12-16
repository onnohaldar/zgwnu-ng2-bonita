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

import { BonitaRestApiService } from '../bonita-rest-api.service'
import { BonitaConfigService } from '../bonita-config.service'
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

    uploadFile(file: File, fileDescription: string): Observable<BonitaFileUploadResponse> {
        let formData: FormData = new FormData()
        formData.append(fileDescription, file, file.name)

        let headers = new Headers()
        headers.append('Accept', 'application/json')

        let options = new RequestOptions({ headers: headers })

        return this.http.post(this.bonitaConfigService.fileUploadUrl, formData, options)
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