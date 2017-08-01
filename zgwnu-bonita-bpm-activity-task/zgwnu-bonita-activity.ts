import { ZgwnuBonitaActivityDeployActor } from './zgwnu-bonita-activity-deploy-actor'
import { ZgwnuBonitaUtils } from '../zgwnu-bonita-rest-api/zgwnu-bonita-utils'

export class ZgwnuBonitaActivity {

    constructor(activityData: any) 
    {
        const utils = new ZgwnuBonitaUtils()

        this.id = activityData.id
        this.type = activityData.type
        this.name = activityData.name
        this.displayName = activityData.displayName
        this.description = activityData.description
        this.displayDescription = activityData.displayDescription
        this.state = activityData.state
        this.reached_state_date = utils.getDateValue(activityData.reached_state_date)
        this.last_update_date = utils.getDateValue(activityData.last_update_date)
        this.dueDate = utils.getDateValue(activityData.dueDate)
        this.priority = activityData.priority

        this.processId = activityData.processId
        this.parentCaseId = activityData.parentCaseId
        this.rootCaseId = activityData.rootCaseId
        this.rootContainerId = activityData.rootContainerId
        
        this.executedBy = activityData.executedBy
        this.executedBySubstitute = activityData.executedBySubstitute
        if (this.actorId instanceof ZgwnuBonitaActivityDeployActor) {
            this.actorId.id = activityData.actorId.id
            this.actorId.process_id = activityData.actorId.process_id
            this.actorId.description = activityData.actorId.description
            this.actorId.name = activityData.actorId.name
            this.actorId.displayName = activityData.actorId.displayName

        } else {
            this.actorId = activityData.actorId
        }
        this.assigned_id = activityData.assigned_id
        if (activityData.assigned_date != '') { this.assigned_date = utils.getDateValue(activityData.assigned_date) }
    }

    id: string // "the activity id (long)",
    type: string // "the activity type (string),
    name: string // "the activity technical name (string)",
    displayName: string // "the human readable activity name (string)",
    description: string // "the activity description (string)",
    displayDescription: string // "the human readable activity description (string)",
    state: string // "the current state of the activity (string, possible values: ready, completed, failed)",
    reached_state_date: Date // "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity reached the current state, for example '2014-10-17 16:05:42.626'",
    last_update_date: Date // "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity was last updated, for example '2014-10-17 16:05:42.626)",
    dueDate: Date // "the date ('yyyy-MM-dd HH:mm:ss.SSS') when this activity is due, for example '2014-10-17 16:05:42.626'",
    priority: string // "the priority (string) of the current task",

    processId: string // "the process definition id (long) of the case which define this task",
    parentCaseId: string // "the immediate containing case id (long, a.k.a process instance id)",
    rootCaseId: string // "the top/root case id (long, a.k.a process instance id). In the case of an event sub process, parentCaseId will the id of the case called while rootCaseId will be the one from the caller case",
    rootContainerId: string // "same as rootCaseId",

    executedBy: string // "the id (long) of the user who performed this task. The activity has to be a human activity otherwise its value will be 0",
    executedBySubstitute: string // "the id (long) of the user who did actually performed the activity in the case of has been done in the name of someone else. Value is 0 otherwise",
    actorId: string | BonitaActivityDeployActor // "the id (long) of the actor that can execute this task, null otherwise",
    assigned_id: string // "the user id (long) that this activity is assigned to, or 0 if it is unassigned",
    assigned_date: Date // "the date ('yyyy-MM-dd HH:mm:ss.SSS') when the current activity was assigned, for example '2014-10-17 16:05:42.626'"
}