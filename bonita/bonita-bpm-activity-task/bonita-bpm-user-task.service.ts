// Bonita Rest Api BPM User Task Service
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

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaBpmTaskUpdateInput } from './bonita-bpm-task-update-input'
import { BonitaUserTask } from './bonita-user-task'
import { BonitaUserTaskMapping } from './bonita-user-task-mapping'
import { BonitaResponse } from '../bonita-rest-api/bonita-response'

@Injectable()
export class BonitaBpmUserTaskService extends BonitaRestApiService {
    private userTaskResourcePath: string = '/bpm/userTask'
    private userTaskResourceUrl: string

    constructor(
        private configService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()

        // configure resource urls
        this.userTaskResourceUrl = configService.apiUrl + this.userTaskResourcePath
    }

    getUserTask(userTaskId: string): Observable<BonitaUserTask> {
        let userTaskMapping: BonitaDataMappingInterface = new BonitaUserTaskMapping()
        return this.http.get(this.userTaskResourceUrl + '/' + userTaskId, this.configService.options)
                        .map(userTaskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    getUserTaskContext(userTaskId: string): Observable<any> {
        return this.http.get(this.userTaskResourceUrl + '/' + userTaskId + '/context', this.configService.options)
                        .map(this.mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    assignUserTask(userTaskId: string, userId?: string): Observable<BonitaResponse> {
        let body: BonitaBpmTaskUpdateInput = new BonitaBpmTaskUpdateInput()

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

    executeUserTask(userTaskId: string, contractValues: any): Observable<BonitaResponse> {
        let postUrl = this.userTaskResourceUrl + '/' + userTaskId + '/execution'
        return this.http.post(postUrl, contractValues, this.configService.sendOptions)
                        .map(this.mapSuccessResponse)
                        .catch(this.handleResponseError)
    }

}