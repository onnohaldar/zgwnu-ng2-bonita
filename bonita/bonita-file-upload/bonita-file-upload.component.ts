// imports generic angular 2 modules
import { Component, OnInit, Input } from '@angular/core'
import { MdIconRegistry } from '@angular/material'

// imports bonita from library
import { BonitaFileUploadService } from './bonita-file-upload.service'
import { BonitaContractInputFile } from '../bonita-contract-input-file' 
import { BonitaErrorResponse } from '../bonita-error-response'
import { BonitaFileUploadResponse } from './bonita-file-upload-response'

@Component({
    moduleId: module.id,
    selector: 'bonita-file-upload',
    templateUrl: 'bonita-file-upload.component.html',
    styleUrls: [ 'bonita-file-upload.component.css' ],
})

export class BonitaFileUploadComponent implements OnInit {
    private iconsPath: string = 'assets/icons/material-design/'
    private fileIconsPath: string = this.iconsPath + 'file/'

    @Input() contractInputFile: BonitaContractInputFile

    errorResponse: BonitaErrorResponse

    constructor (
        private fileUploadService: BonitaFileUploadService,
        private mdIconRegistry: MdIconRegistry,
    )
    {
        mdIconRegistry.addSvgIconInNamespace('bonita', 'file_upload', this.fileIconsPath + 'ic_file_upload_24px.svg')
    }

    ngOnInit() {
        console.log('BonitaFileUploadComponent');        
    }
  
    onSelectFile(event: any) {
        console.log('onSelectFile')
        let file: File = event.srcElement.files[0]
        console.log(file)

        this.fileUploadService.uploadFile(file, 'Adviesrapport')
            .subscribe(
                fileUploadResponse => {
                    this.contractInputFile.filename = file.name
                    this.contractInputFile.contentType = file.type
                    this.contractInputFile.tempPath = fileUploadResponse.tempPath
                },
                errorResponse => this.errorResponse = errorResponse
            )
    }

}