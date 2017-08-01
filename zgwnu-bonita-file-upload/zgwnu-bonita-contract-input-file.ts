import { ZgwnuBonitaFileUploadResponse } from './zgwnu-bonita-file-upload-response'

export class ZgwnuBonitaContractInputFile {

  constructor(fileInput?: File, responseInput?: ZgwnuBonitaFileUploadResponse){

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
