// ZaakgerichtWerken.nu Bonita Rest Api BPM Human Task Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc3
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
import { ZgwnuBonitaHumanTask } from './zgwnu-bonita-human-task'
import { ZgwnuBonitaHumanTaskMapping } from './zgwnu-bonita-human-task-mapping'
import { ZgwnuBonitaResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-response'

@Injectable()
export class ZgwnuBonitaBpmHumanTaskService extends ZgwnuBonitaRestApiService {
    private readonly HUMAN_TASK_RESOURCE_PATH: string = '/bpm/humanTask'
    private humanTaskResourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.humanTaskResourceUrl = configService.apiUrl + this.HUMAN_TASK_RESOURCE_PATH
    }

    searchHumanTasks(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaHumanTask[]> {
        let humanTaskMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaHumanTaskMapping()
        return this.http.get(this.buildHumanTaskSearchRequest(searchParms), this.configService.options)
                        .map(humanTaskMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildHumanTaskSearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.humanTaskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getHumanTask(humanTaskId: string): Observable<ZgwnuBonitaHumanTask> {
        let humanTaskMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaHumanTaskMapping()
        return this.http.get(this.humanTaskResourceUrl + '/' + humanTaskId, this.configService.options)
                        .map(humanTaskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}