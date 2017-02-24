import { DomSanitizer } from '@angular/platform-browser'
import { Component, OnInit } from '@angular/core'
import { MdIconRegistry } from '@angular/material'

import { ToolbarService } from './toolbar.service'

@Component({
  moduleId: module.id,
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [ 'toolbar.component.css' ],
})

export class ToolbarComponent implements OnInit {
  private iconsPath: string = 'assets/icons/material-design/'
  private contentIconsPath: string = this.iconsPath + 'content/'
  private navigationIconsPath = this.iconsPath + 'navigation/'

  constructor(
    public toolbarService: ToolbarService,
    private mdIconRegistry: MdIconRegistry, 
    private sanitizer: DomSanitizer, 
  )
  {

    // register all used material icons here
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'save', 
      sanitizer.bypassSecurityTrustResourceUrl(this.contentIconsPath + 'ic_save_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'close', 
      sanitizer.bypassSecurityTrustResourceUrl(this.navigationIconsPath + 'ic_close_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'cancel', 
      sanitizer.bypassSecurityTrustResourceUrl(this.navigationIconsPath + 'ic_cancel_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'menu', 
      sanitizer.bypassSecurityTrustResourceUrl(this.navigationIconsPath + 'ic_menu_24px.svg'))
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'send', 
      sanitizer.bypassSecurityTrustResourceUrl(this.contentIconsPath + 'ic_send_24px.svg'))
  }

  ngOnInit():void {
    console.log('InitToolbarComponent')
  }

  onClickExit() {
    this.toolbarService.componentReference.onToolbarClickExit()
  }

  onClickSave() {
    this.toolbarService.componentReference.onToolbarClickSave()
  }

  onClickCancel() {
    this.toolbarService.componentReference.onToolbarClickCancel()
  }

  onClickMenu() {
    this.toolbarService.componentReference.onToolbarClickMenu()
  }

  onClickSend() {
    this.toolbarService.componentReference.onToolbarClickSend()
  }


}