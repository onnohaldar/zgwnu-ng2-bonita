import { Headers } from '@angular/http'

export class BonitaSession {

  constructor(sessionData: any, headerData: Headers)
  {
    this.user_id = sessionData.user_id
    this.user_name = sessionData.user_name
    this.session_id = sessionData.session_id
    this.conf = sessionData.conf
    this.is_technical_user = (sessionData.is_technical_user == 'true')
    this.version = sessionData.version
    if (sessionData.tenant) { this.tenant = sessionData.tenant }
    let headers = headerData.toJSON()
    console.log(headers)
    this.token = headers['X-Bonita-API-Token'][0]
  }

  user_id: string
  user_name: string
  session_id: string
  conf: string
  is_technical_user: boolean
  version: string
  tenant?: string
  token?: string
}
