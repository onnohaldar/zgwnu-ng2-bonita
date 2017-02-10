export class BonitaDocumentCreateInput {

    constructor(inputData?: any)
    {
        if (inputData) {
            this.caseId = inputData.caseId
            this.name = inputData.name
            if (inputData.file) { this.file = inputData.file}
            if (inputData.url) { this.file = inputData.url}
            if (inputData.fileName) { this.file = inputData.fileName}
            if (inputData.contentMimetype) { this.file = inputData.contentMimetype}
            if (inputData.description) { this.file = inputData.description}
        }

    }

    caseId: string
    name: string
    file?: string
    url?: string
    fileName?: string
    contentMimetype?: string
    description?: string
}