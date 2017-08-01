export class SingleBusinessDataRefence {

    constructor(referenceData: any)
    {
        this.name = referenceData.name
        this.type = referenceData.type
        this.storageId = referenceData.storageId
        this.storageId_string = referenceData.storageId_string
    }

    name: string  // data reference name 
    type: string  // business data object type
    storageId: number // storage id in number format
    storageId_string: string // storage id in string format
}