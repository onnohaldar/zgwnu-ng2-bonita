// Bonita Rest Api BPM Activity Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bpm-api#toc1
//
//
import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaSearchParms } from '../bonita-rest-api/bonita-search-parms'
import { BonitaActivity } from './bonita-activity'
import { BonitaActivityMapping } from './bonita-activity-mapping'
import { BonitaResponse } from '../bonita-rest-api/bonita-response'

@Injectable()
export class BonitaBpmActivityService extends BonitaRestApiService {
    private activityResourcePath: string = '/bpm/activity'
    private activityResourceUrl: string

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.activityResourceUrl = bonitaConfigService.apiUrl + this.activityResourcePath
    }

    searchActivities(searchParms: BonitaSearchParms): Observable<BonitaActivity[]> {
        let activityMapping: BonitaDataMappingInterface = new BonitaActivityMapping()
        return this.http.get(this.buildActivitySearchRequest(searchParms))
                        .map(activityMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildActivitySearchRequest(searchParms: BonitaSearchParms): string {
        return this.activityResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getActivity(activityId: string): Observable<BonitaActivity> {
        let activityMapping: BonitaDataMappingInterface = new BonitaActivityMapping()
        return this.http.get(this.activityResourceUrl + '/' + activityId)
                        .map(activityMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}