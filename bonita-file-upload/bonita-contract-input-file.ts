export class BonitaContractInputFile {

  constructor(inputFileData?: any){
    if (inputFileData) {
      if (inputFileData.filename) { this.filename = inputFileData.filename }
      if (inputFileData.tempPath) { this.filename = inputFileData.tempPath }
      if (inputFileData.contentType) { this.filename = inputFileData.contentType }
    }
  }

  filename: string
  tempPath: string
  contentType: string
}
