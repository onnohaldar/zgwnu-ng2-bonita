// ZaakgerichtWerken.nu Bonita Rest Api Business Data Service
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bdm-api#
//
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { ZgwnuBonitaRestApiService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-rest-api.service'
import { ZgwnuBonitaDataMappingInterface } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping.interface'
import { ZgwnuBonitaDataMapping } from '../zgwnu-bonita-rest-api/zgwnu-bonita-data-mapping'
import { ZgwnuBonitaConfigService } from '../zgwnu-bonita-rest-api/zgwnu-bonita-config.service'
import { ZgwnuBonitaBusinessDataQueryParms } from './zgwnu-bonita-business-data-query-parms'
import { ZgwnuBonitaBusinessDataContext } from './zgwnu-bonita-business-data-context'
import { ZgwnuSingleBusinessDataRefence } from './zgwnu-single-business-data-reference'
import { ZgwnuMultipleBusinessDataRefence } from './zgwnu-multiple-business-data-reference'

@Injectable()
export class ZgwnuBonitaBusinessDataService extends ZgwnuBonitaRestApiService {
    private resourcePath: string = '/bdm'
    private resourceUrl: string

    constructor(
        private configService: ZgwnuBonitaConfigService,
        private http: Http
    ) 
    { 
        super()
        this.resourceUrl = configService.apiUrl + this.resourcePath
    }

    // Bonita Rest Api Business Data
    // --------------------------------------------------------------------------
    //
    // based on http://documentation.bonitasoft.com/?page=bdm-api#toc0
    //
    // Request URL template: ../API/bdm/businessData/:businessDataType/:persistenceId
    //
    getBusinessData(businessDataObjectType: string, persistenceId: number, mappingParm?: ZgwnuBonitaDataMappingInterface): Observable<any> {
        let mapping = this.getMapping(mappingParm)
        return this.http.get(this.buildGetRequestUrl(businessDataObjectType, persistenceId), this.configService.options)
                        .map(mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    protected buildGetRequestUrl(businessDataObjectType: string, persistenceId: number): string {
        return this.resourceUrl + '/businessData/' + 
                this.configService.businessDataModelPackage + '.' + businessDataObjectType + 
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
    queryBusinessData(businessDataObjectType: string, queryParms: ZgwnuBonitaBusinessDataQueryParms, mappingParm?: ZgwnuBonitaDataMappingInterface): Observable<any> {
        let mapping = this.getMapping(mappingParm)
        return this.http.get(this.buildQueryRequestUrl(businessDataObjectType, queryParms), this.configService.options)
                        .map(mapping.mapResponseArray)
                        .catch(this.handleResponseError)
    }

    protected buildQueryRequestUrl(businessDataObjectType: string, queryParms: ZgwnuBonitaBusinessDataQueryParms): string {
        return this.resourceUrl + '/businessData/' + 
                this.configService.businessDataModelPackage + '.' + businessDataObjectType + 
                    '?' + queryParms.getUrlEncondedParms()
    }

    // Bonita Rest Api get Business Data from context
    // --------------------------------------------------------------------------
    //
    // based on http://documentation.bonitasoft.com/?page=bpm-api#toc6
    //
    getBusinessDataFromContext(businessDataContext: ZgwnuBonitaBusinessDataContext, mappingParm?: ZgwnuBonitaDataMappingInterface): Observable<any> {
        let mapping = this.getMapping(mappingParm)
        return this.http.get(this.buildGetFromContextUrl(businessDataContext), this.configService.options)
                        .map(mapping.mapResponse)
                        .catch(this.handleResponseError)
    }

    protected buildGetFromContextUrl(businessDataContext: ZgwnuBonitaBusinessDataContext): string {
        return this.configService.baseUrl + '/' + businessDataContext.link
    }

    private getMapping(mappingParm?: ZgwnuBonitaDataMappingInterface): ZgwnuBonitaDataMappingInterface {
        if (mappingParm) {
            return mappingParm
        } else {
            return this.mapping
        }
    }

    // Bonita Rest Api get Business Data from context
    // --------------------------------------------------------------------------
    //    
    // base on http://documentation.bonitasoft.com/?page=bdm-api#toc2
    //
    private getSingleBusinessDataReference(caseId: string, businessDataObjectType: string): Observable<ZgwnuSingleBusinessDataRefence> {
        return this.getBusinessDataReference(caseId, businessDataObjectType)
                    .map(this.mapSingleBusinessDataReference)
                    .catch(this.handleResponseError)
    }

    private mapSingleBusinessDataReference(res: Response) {
        let dataReference: ZgwnuSingleBusinessDataRefence = new ZgwnuSingleBusinessDataRefence(res.json())
        return dataReference
    }

    private getMultipleBusinessDataReference(caseId: string, businessDataObjectType: string): Observable<ZgwnuMultipleBusinessDataRefence> {
        return this.getBusinessDataReference(caseId, businessDataObjectType)
                    .map(this.mapSingleBusinessDataReference)
                    .catch(this.handleResponseError)
    }

    private mapMultipleBusinessDataReference(res: Response) {
        let dataReference: ZgwnuMultipleBusinessDataRefence = new ZgwnuMultipleBusinessDataRefence(res.json())
        return dataReference
    }

    private getBusinessDataReference(caseId: string, businessDataObjectType: string): Observable<any> {
        return this.http.get(this.resourceUrl + '/businessDataReference/' + caseId + '/' + businessDataObjectType, this.configService.options)
    }

}