// ZaakgerichtWerken.nu Bonita Rest Api BPM Task Service
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

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaSearchParms } from '../zgwnu-bonita-rest-api/zgwnu-bonita-search-parms'
import { ZgwnuBonitaTask } from './zgwnu-bonita-task'
import { ZgwnuBonitaTaskMapping } from './zgwnu-bonita-task-mapping'
import { ZgwnuBonitaResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-response'

@Injectable()
export class ZgwnuBonitaBpmTaskService extends ZgwnuBonitaRestApiService {
    private readonly TASK_RESOURCE_PATH: string = '/bpm/task'
    private taskResourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.taskResourceUrl = configService.apiUrl + this.TASK_RESOURCE_PATH
    }

    searchTasks(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaTask[]> {
        let taskMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaTaskMapping()
        return this.http.get(this.buildTaskSearchRequest(searchParms), this.configService.options)
                        .map(taskMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildTaskSearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.taskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getTask(taskId: string): Observable<ZgwnuBonitaTask> {
        let taskMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaTaskMapping()
        return this.http.get(this.taskResourceUrl + '/' + taskId, this.configService.options)
                        .map(taskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}