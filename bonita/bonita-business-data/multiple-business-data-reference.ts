export class MultipleBusinessDataRefence {

    constructor(referenceData: any)
    {
        this.name = referenceData.name
        this.type = referenceData.type
        this.storageIds = referenceData.storageIds
        this.storageIds_string = referenceData.storageIds_string
    }

    name: string  // data reference name 
    type: string  // business data object type
    storageIds: number[] // storage ids in number format
    storageIds_string: string[] // storage ids in string format
}