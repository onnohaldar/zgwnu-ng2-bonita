export class ToolbarButtonProperties {
    active: boolean
    tooltip: string
    tooltipPosition: string = 'below'
    // "above"|"below"|"before"|"after"

    constructor(
        active: boolean,
        tooltip: string,
        tooltipPosition?: string,
    )
    {
        this.active = active
        this.tooltip = tooltip
        if (tooltipPosition != undefined) {
            this.tooltipPosition = tooltipPosition
        }
    }
}