// Bonita Rest Api BDM Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bdm-api#
//
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { BonitaRestApiService } from '../bonita-rest-api/bonita-rest-api.service'
import { BonitaDataMappingInterface } from '../bonita-rest-api/bonita-data-mapping.interface'
import { BonitaDataMapping } from '../bonita-rest-api/bonita-data-mapping'
import { BonitaConfigService } from '../bonita-rest-api/bonita-config.service'
import { BonitaBusinessDataQueryParms } from './bonita-business-data-query-parms'
import { BonitaBusinessDataContext } from './bonita-business-data-context'

@Injectable()
export class BonitaBusinessDataService extends BonitaRestApiService {
    private resourcePath: string = '/bdm'
    private resourceUrl: string

    constructor(
        private bonitaConfigService: BonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.resourceUrl = bonitaConfigService.apiUrl + this.resourcePath
    }

    // Bonita Rest Api Business Data
    // --------------------------------------------------------------------------
    //
    // based on http://documentation.bonitasoft.com/?page=bdm-api#toc0
    //
    // Request URL template: ../API/bdm/businessData/:businessDataType/:persistenceId
    //
    getBusinessData(businessDataObjectType: string, persistenceId: number, mappingParm?: BonitaDataMappingInterface): Observable<any> {
        let mapping = this.getMapping(mappingParm)
        return this.http.get(this.buildGetRequestUrl(businessDataObjectType, persistenceId), this.options)
                        .map(mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    protected buildGetRequestUrl(businessDataObjectType: string, persistenceId: number): string {
        return this.resourceUrl + '/businessData/' + 
                this.bonitaConfigService.businessDataModelPackage + '.' + businessDataObjectType + 
                    '/' + persistenceId.toString()
    }

    // Bonita Rest Api Business Data Query
    // --------------------------------------------------------------------------
    //
    // based on http://documentation.bonitasoft.com/?page=bdm-api#toc1
    //
    // Request URL template: ../API/bdm/businessData/_businessDataType_?q=_queryName_
    //                       &p=0&c=10&f=param=value
    //
    queryBusinessData(businessDataObjectType: string, queryParms: BonitaBusinessDataQueryParms, mappingParm?: BonitaDataMappingInterface): Observable<any> {
        let mapping = this.getMapping(mappingParm)
        return this.http.get(this.buildQueryRequestUrl(businessDataObjectType, queryParms), this.options)
                        .map(mapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    protected buildQueryRequestUrl(businessDataObjectType: string, queryParms: BonitaBusinessDataQueryParms): string {
        return this.resourceUrl + '/businessData/' + 
                this.bonitaConfigService.businessDataModelPackage + '.' + businessDataObjectType + 
                    '?' + queryParms.getUrlEncondedParms()
    }

    // Bonita Rest Api get Business Data from context
    // --------------------------------------------------------------------------
    //
    // based on http://documentation.bonitasoft.com/?page=bpm-api#toc6
    //
    getBusinessDataFromContext(businessDataContext: BonitaBusinessDataContext, mappingParm?: BonitaDataMappingInterface): Observable<any> {
        let mapping = this.getMapping(mappingParm)
        return this.http.get(this.buildGetFromContextUrl(businessDataContext), this.options)
                        .map(mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    protected buildGetFromContextUrl(businessDataContext: BonitaBusinessDataContext): string {
        return this.bonitaConfigService.baseUrl + '/' + businessDataContext.link
    }

    private getMapping(mappingParm?: BonitaDataMappingInterface): BonitaDataMappingInterface {
        if (mappingParm) {
            return mappingParm
        } else {
            return this.mapping
        }
    }

}