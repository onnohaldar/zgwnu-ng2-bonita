// ZaakgerichtWerken.nu Bonita Rest Api BPM User Task Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc6
//
//
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaBpmTaskUpdateInput } from './zgwnu-bonita-bpm-task-update-input'
import { ZgwnuBonitaUserTask } from './zgwnu-bonita-user-task'
import { ZgwnuBonitaUserTaskMapping } from './zgwnu-bonita-user-task-mapping'
import { ZgwnuBonitaResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-response'

@Injectable()
export class ZgwnuBonitaBpmUserTaskService extends ZgwnuBonitaRestApiService {
    private readonly USER_TASK_RESOURCE_PATH: string = '/bpm/userTask'
    private userTaskResourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()

        // configure resource urls
        this.userTaskResourceUrl = configService.apiUrl + this.USER_TASK_RESOURCE_PATH
    }

    getUserTask(userTaskId: string): Observable<ZgwnuBonitaUserTask> {
        let userTaskMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaUserTaskMapping()
        return this.http.get(this.userTaskResourceUrl + '/' + userTaskId, this.configService.options)
                        .map(userTaskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    getUserTaskContext(userTaskId: string): Observable<any> {
        return this.http.get(this.userTaskResourceUrl + '/' + userTaskId + '/context', this.configService.options)
                        .map(this.mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    assignUserTask(userTaskId: string, userId?: string): Observable<ZgwnuBonitaResponse> {
        let body: ZgwnuBonitaBpmTaskUpdateInput = new ZgwnuBonitaBpmTaskUpdateInput()

        if (userId) {
            // assign to specified user
            body.assigned_id = userId
        } else {
            // assign to current logged user
            body.assigned_id = this.configService.session.user_id
        }

        let putUrl = this.userTaskResourceUrl + '/' + userTaskId
        return this.http.put(putUrl, body, this.configService.sendOptions)
                        .map(this.mapSuccessResponse)
                        .catch(this.handleResponseError)

    }

    executeUserTask(userTaskId: string, contractValues: any): Observable<ZgwnuBonitaResponse> {
        let postUrl = this.userTaskResourceUrl + '/' + userTaskId + '/execution'
        return this.http.post(postUrl, contractValues, this.configService.sendOptions)
                        .map(this.mapSuccessResponse)
                        .catch(this.handleResponseError)
    }

}