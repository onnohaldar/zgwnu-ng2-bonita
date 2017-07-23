import { BonitaFileUploadResponse } from './bonita-file-upload-response'

export class BonitaContractInputFile {

  constructor(fileInput?: File, responseInput?: BonitaFileUploadResponse){

    if (fileInput) {
      this.filename = fileInput.name
      this.contentType = fileInput.type
    }

    if (responseInput) {
        this.tempPath = responseInput.tempPath
    }

  }

  filename: string
  contentType: string
  tempPath: string
}
