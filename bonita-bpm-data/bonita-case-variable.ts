export class BonitaCaseVariable {

    constructor(caseVariableData: any)
    {
        this.description = caseVariableData.description
        this.name = caseVariableData.name
        this.value = caseVariableData.value
        this.case_id = caseVariableData.case_id
        this.type = caseVariableData.type        
    }

    description: string
    name: string
    value: string
    case_id: string
    type: string
}