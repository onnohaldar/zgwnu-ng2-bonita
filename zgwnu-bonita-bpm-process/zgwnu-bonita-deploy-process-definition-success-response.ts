import { ZgwnuBonitaResponse } from '../zgwnu-bonita-rest-api/zgwnu-bonita-response'

export class ZgwnuBonitaDeployProcessDefinitionSuccessResponse extends ZgwnuBonitaResponse {
    id: string
    deploymentDate: Date
    description: string
    activationState: string
    name: string
    displayName: string
    actorinitiatorid: string 
    last_update_date: Date
    configurationState: string
    version: string
}