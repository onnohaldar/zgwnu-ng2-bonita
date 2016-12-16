// Bonita Rest Api BPM Task Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc5
//
//
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from './bonita-rest-api.service'
import { BonitaDataMappingInterface } from './bonita-data-mapping.interface'
import { BonitaConfigService } from './bonita-config.service'
import { BonitaSearchParms } from './bonita-search-parms'
import { BonitaTask } from './bonita-task'
import { BonitaTaskMapping } from './bonita-task-mapping'
import { BonitaResponse } from './bonita-response'

@Injectable()
export class BonitaBpmTaskService extends BonitaRestApiService {
    private taskResourcePath: string = '/bpm/task'
    private taskResourceUrl: string

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.taskResourceUrl = bonitaConfigService.apiUrl + this.taskResourcePath
    }

    searchTasks(searchParms: BonitaSearchParms): Observable<BonitaTask[]> {
        let taskMapping: BonitaDataMappingInterface = new BonitaTaskMapping()
        return this.http.get(this.buildTaskSearchRequest(searchParms))
                        .map(taskMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildTaskSearchRequest(searchParms: BonitaSearchParms): string {
        return this.taskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getTask(taskId: string): Observable<BonitaTask> {
        let taskMapping: BonitaDataMappingInterface = new BonitaTaskMapping()
        return this.http.get(this.taskResourceUrl + '/' + taskId)
                        .map(taskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}