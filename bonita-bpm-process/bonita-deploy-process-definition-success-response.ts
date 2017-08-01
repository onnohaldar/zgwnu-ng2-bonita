import { BonitaResponse } from '../bonita-rest-api/bonita-response'

export class BonitaDeployProcessDefinitionSuccessResponse extends BonitaResponse {
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