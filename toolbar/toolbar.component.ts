import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
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
    private router: Router,
    public toolbarService: ToolbarService,
    private mdIconRegistry: MdIconRegistry, 
  )
  {
    // register all used material icons here
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'save', this.contentIconsPath + 'ic_save_24px.svg')
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'close', this.navigationIconsPath + 'ic_close_24px.svg')
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'cancel', this.navigationIconsPath + 'ic_cancel_24px.svg')
    mdIconRegistry.addSvgIconInNamespace('toolbar', 'menu', this.navigationIconsPath + 'ic_menu_24px.svg')
  }

  ngOnInit():void {
    console.log('InitToolbarComponent')
  }

  onClickExit() {
    this.router.navigate(['/exit'])
  }

  onClickSave() {
    this.toolbarService.componentReference.onToolbarClickSave()
  }

  onClickCancel() {
    this.toolbarService.componentReference.onToolbarClickCancel()
  }
  
}