import { ZgwnuBonitaResponse } from './zgwnu-bonita-response'

export class ZgwnuBonitaErrorResponse extends ZgwnuBonitaResponse {
    exception: string
    message: string
    explanations: string[]
}