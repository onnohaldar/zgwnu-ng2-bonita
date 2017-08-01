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

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaSearchParms } from '../bonita-rest-api/bonita-search-parms'
import { BonitaTask } from './bonita-task'
import { BonitaTaskMapping } from './bonita-task-mapping'
import { BonitaResponse } from '../bonita-rest-api/bonita-response'

@Injectable()
export class BonitaBpmTaskService extends BonitaRestApiService {
    private taskResourcePath: string = '/bpm/task'
    private taskResourceUrl: string

    constructor(
        private configService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.taskResourceUrl = configService.apiUrl + this.taskResourcePath
    }

    searchTasks(searchParms: BonitaSearchParms): Observable<BonitaTask[]> {
        let taskMapping: BonitaDataMappingInterface = new BonitaTaskMapping()
        return this.http.get(this.buildTaskSearchRequest(searchParms), this.configService.options)
                        .map(taskMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildTaskSearchRequest(searchParms: BonitaSearchParms): string {
        return this.taskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getTask(taskId: string): Observable<BonitaTask> {
        let taskMapping: BonitaDataMappingInterface = new BonitaTaskMapping()
        return this.http.get(this.taskResourceUrl + '/' + taskId, this.configService.options)
                        .map(taskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}