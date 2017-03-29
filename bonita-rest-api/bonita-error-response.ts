import { BonitaResponse } from './bonita-response'

export class BonitaErrorResponse extends BonitaResponse {
    exception: string
    message: string
    explanations: string[]
}