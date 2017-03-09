import { TooltipPosition } from '@angular/material'

export class ToolbarButtonProperties {
    active: boolean
    disabled: boolean = false
    tooltip: string
    tooltipPosition: TooltipPosition = 'below'
    // 'left' | 'right' | 'above' | 'below' | 'before' | 'after'

    constructor(
        active: boolean,
        tooltip: string,
        tooltipPosition?: TooltipPosition,
    )
    {
        this.active = active
        this.tooltip = tooltip
        if (tooltipPosition) {
            this.tooltipPosition = tooltipPosition
        }
    }
}