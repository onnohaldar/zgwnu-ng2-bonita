import { ZgwnuBonitaUtils } from '../zgwnu-bonita-rest-api/zgwnu-bonita-utils'

export class ZgwnuBonitaCase {

    constructor(caseData: any)
    {
        const utils = new ZgwnuBonitaUtils()

        this.id = caseData.id
        this.end_date = utils.getDateValue(caseData.end_date)
        this.failedFlowNodes = caseData.failedFlowNodes
        this.start = utils.getDateValue(caseData.start)
        this.activeFlowNodes = caseData.activeFlowNodes
        this.state = caseData.state
        this.rootCaseId = caseData.rootCaseId
        this.started_by = caseData.started_by
        this.processDefinitionId = caseData.processDefinitionId
        this.last_update_date = utils.getDateValue(caseData.last_update_date)
        if (caseData.searchIndex1Label) { this.searchIndex1Label = caseData.searchIndex1Label }
        if (caseData.searchIndex2Label) { this.searchIndex2Label = caseData.searchIndex2Label }
        if (caseData.searchIndex3Label) { this.searchIndex3Label = caseData.searchIndex2Label }
        if (caseData.searchIndex4Label) { this.searchIndex4Label = caseData.searchIndex3Label }
        if (caseData.searchIndex5Label) { this.searchIndex5Label = caseData.searchIndex4Label }
        if (caseData.searchIndex1Value) { this.searchIndex1Value = caseData.searchIndex1Value }
        if (caseData.searchIndex2Value) { this.searchIndex2Value = caseData.searchIndex2Value }
        if (caseData.searchIndex3Value) { this.searchIndex3Value = caseData.searchIndex3Value }
        if (caseData.searchIndex4Value) { this.searchIndex4Value = caseData.searchIndex4Value }
        if (caseData.searchIndex5Value) { this.searchIndex5Value = caseData.searchIndex5Value }

    }

    id: string // the identifier of the case
    end_date: Date // the date set when the case is closed
    failedFlowNodes: number // count of failed flow nodes if parameter n=failedFlowNodes is given
    startedBySubstitute: string // the identifier of the substitute user (as Process manager or Administrator) who started the process. It can be also the substitute user if d=startedBySubstitute is given.
    start: Date // the starting date of the case
    activeFlowNodes: number // count of active flow nodes if parameter n=activeFlowNodes is given
    state: string // state: an enum that represent the state of the case, it can be INITIALIZING, STARTED, SUSPENDED, CANCELLED, ABORTED, COMPLETING, COMPLETED, ERROR, ABORTING
    rootCaseId: string // the identifier of the container of the case
    started_by: string // the identifier of the user who started the case
    processDefinitionId: string // the identifier of the process related of the case
    last_update_date: Date // the date of the last update done on the case
    searchIndex1Label?: string // the 1st search index label (from 6.5, in Subscription editions only)
    searchIndex2Label?: string // the 2nd search index label (from 6.5, in Subscription editions only)
    searchIndex3Label?: string // the 3rd search index label (from 6.5, in Subscription editions only)
    searchIndex4Label?: string // the 4th search index label (from 6.5, in Subscription editions only)
    searchIndex5Label?: string // the 5th search index label (from 6.5, in Subscription editions only)
    searchIndex1Value?: string // the 1st search index value (from 6.5, in Subscription editions only)
    searchIndex2Value?: string // the 2nd search index value (from 6.5, in Subscription editions only)
    searchIndex3Value?: string // the 3rd search index value (from 6.5, in Subscription editions only)
    searchIndex4Value?: string // the 4th search index value (from 6.5, in Subscription editions only)
    searchIndex5Value?: string // the 5th search index value (from 6.5, in Subscription editions only)
}