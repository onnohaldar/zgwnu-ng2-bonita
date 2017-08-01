// ZaakgerichtWerken.nu Bonita Rest Api BPM Activity Service
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

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaSearchParms } from '../zgwnu-bonita-rest-api/zgwnu-bonita-search-parms'
import { ZgwnuBonitaActivity } from './zgwnu-bonita-activity'
import { ZgwnuBonitaActivityMapping } from './zgwnu-bonita-activity-mapping'
import { ZgwnuBonitaResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-response'

@Injectable()
export class ZgwnuBonitaBpmActivityService extends ZgwnuBonitaRestApiService {
    private readonly ACTIVITY_RESOURCE_PATH: string = '/bpm/activity'
    private activityResourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.activityResourceUrl = configService.apiUrl + this.ACTIVITY_RESOURCE_PATH
    }

    searchActivities(searchParms: ZgwnuBonitaSearchParms): Observable<ZgwnuBonitaActivity[]> {
        let activityMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaActivityMapping()
        return this.http.get(this.buildActivitySearchRequest(searchParms), this.configService.options)
                        .map(activityMapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    private buildActivitySearchRequest(searchParms: ZgwnuBonitaSearchParms): string {
        return this.activityResourceUrl + '?' + searchParms.getUrlEncondedParms()
    }

    getActivity(activityId: string): Observable<ZgwnuBonitaActivity> {
        let activityMapping: ZgwnuBonitaDataMappingInterface = new ZgwnuBonitaActivityMapping()
        return this.http.get(this.activityResourceUrl + '/' + activityId, this.configService.options)
                        .map(activityMapping.mapResponse)
                        .catch(this.handleResponseError)
    }

}