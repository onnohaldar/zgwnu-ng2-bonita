import { Injectable } from '@angular/core'

import { ToolbarButtonProperties } from './toolbar-button-properties'

@Injectable()
export class ToolbarService {
    private _componentReference: any

    mainTitle: string = 'ZgwnuModules2'
    subTitle: string = ''

    menuButton: ToolbarButtonProperties = new ToolbarButtonProperties(true, 'menu')
    saveButton: ToolbarButtonProperties = new ToolbarButtonProperties(false, 'save')
    sendButton: ToolbarButtonProperties = new ToolbarButtonProperties(false, 'send')
    cancelButton: ToolbarButtonProperties = new ToolbarButtonProperties(false, 'cancel')

    exitButton: ToolbarButtonProperties = new ToolbarButtonProperties(true, 'exit')

    set componentReference(reference: any) {
        this.menuButton.active = true
        this.saveButton.active = false
        this.sendButton.active = false
        this.cancelButton.active = false
        this.exitButton.active = true
        this._componentReference = reference
    }

    get componentReference() {
        return this._componentReference
    }

}
