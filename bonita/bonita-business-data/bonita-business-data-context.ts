export class BonitaBusinessDataContext {

    constructor(businessDataRef: any) {
        this.name = businessDataRef.name
        this.type = businessDataRef.type
        this.link = businessDataRef.link
        this.storageId = businessDataRef.storageId
        this.storageId_string = businessDataRef.storageId_string
    }

    name: string
    type: string
    link: string
    storageId: number
    storageId_string: string
}