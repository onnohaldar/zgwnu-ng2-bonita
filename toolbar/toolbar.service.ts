import { Injectable } from '@angular/core'

import { ToolbarButtonProperties } from './toolbar-button-properties'

@Injectable()
export class ToolbarService {
    componentReference: any

    mainTitle: string = 'ZgwnuModules2'
    subTitle: string = ''

    menuButton: ToolbarButtonProperties = new ToolbarButtonProperties(true, 'menu')
    saveButton: ToolbarButtonProperties = new ToolbarButtonProperties(false, 'save')
    cancelButton: ToolbarButtonProperties = new ToolbarButtonProperties(false, 'cancel')

    exitButton: ToolbarButtonProperties = new ToolbarButtonProperties(true, 'exit')

}
