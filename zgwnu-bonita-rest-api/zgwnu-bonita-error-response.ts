import { ZgwnuBonitaResponse } from './zgwnu-bonita-response'

export class BonitaErrorResponse extends ZgwnuBonitaResponse {
    exception: string
    message: string
    explanations: string[]
}