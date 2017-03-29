import { BonitaUtils } from '../bonita-rest-api/bonita-utils'

export class BonitaDocument {

    constructor(documentData: any)
    {
        const utils = new BonitaUtils()

        this.id = documentData.id
        this.creationDate = utils.getDateValue(documentData.creationDate)
        this.author = documentData.author
        this.index = documentData.index
        this.contentMimetype = documentData.contentMimetype
        this.caseId = documentData.caseId  
        this.contentStorageId = documentData.contentStorageId
        this.isInternal = documentData.isInternal
        this.description = documentData.description
        this.name = documentData.name
        this.fileName = documentData.fileName
        this.submittedBy = documentData.submittedBy
        this.url = documentData.url
        this.version = documentData.version
    }

    id: string // documentId 
    creationDate: Date // date and time 
    author: string // submittorUserId 
    index: number // index in a list of documents, or -1 for a single document 
    contentMimetype: string // MIMEtype 
    caseId: string // caseId  
    contentStorageId: string // storageId  
    isInternal: boolean // true | false  
    description: string //  description  
    name: string // name  
    fileName: string // filename  
    submittedBy: string // submittorUserId  
    url: string // urlForDownload  
    version: string // version
}