// Bonita Rest Api BPM Human Task Service
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

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaSearchParms } from '../bonita-rest-api/bonita-search-parms'
import { BonitaHumanTask } from './bonita-human-task'
import { BonitaHumanTaskMapping } from './bonita-human-task-mapping'
import { BonitaResponse } from '../bonita-rest-api/bonita-response'

@Injectable()
export class BonitaBpmHumanTaskService extends BonitaRestApiService {
    private humanTaskResourcePath: string = '/bpm/humanTask'
    private humanTaskResourceUrl: string

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.humanTaskResourceUrl = bonitaConfigService.apiUrl + this.humanTaskResourcePath
    }

    searchHumanTasks(searchParms: BonitaSearchParms): Observable<BonitaHumanTask[]> {
        let humanTaskMapping: BonitaDataMappingInterface = new BonitaHumanTaskMapping()
        return this.http.get(this.buildHumanTaskSearchRequest(searchParms), this.options)
                        .map(humanTaskMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildHumanTaskSearchRequest(searchParms: BonitaSearchParms): string {
        return this.humanTaskResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getHumanTask(humanTaskId: string): Observable<BonitaHumanTask> {
        let humanTaskMapping: BonitaDataMappingInterface = new BonitaHumanTaskMapping()
        return this.http.get(this.humanTaskResourceUrl + '/' + humanTaskId, this.options)
                        .map(humanTaskMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}