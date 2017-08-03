import { ZgwnuBonitaProcessActivationStateType } from './zgwnu-bonita-process-activation-state.type'
import { ZgwnuBonitaProcessConfigurationStateType } from './zgwnu-bonita-process-configuration-state.type'
import { ZgwnuBonitaUtils } from '../zgwnu-bonita-rest-api/zgwnu-bonita-utils'

export class ZgwnuBonitaProcessDefinition {

  constructor(processDefinitionData: any) 
  {
    const utils = new ZgwnuBonitaUtils()

    this.id = processDefinitionData.id
    this.icon = processDefinitionData.icon
    this.displayDescription = processDefinitionData.displayDescription
    this.deploymentDate = utils.getDateValue(processDefinitionData.deploymentDate)
    this.description = processDefinitionData.description
    this.activationState = processDefinitionData.activationState
    this.name = processDefinitionData.name
    this.deployedBy = processDefinitionData.deployedBy
    this.displayName = processDefinitionData.displayName
    this.actorinitiatorid = processDefinitionData.actorinitiatorid
    this.last_update_date = utils.getDateValue(processDefinitionData.last_update_date)
    this.configurationState = processDefinitionData.configurationState
    this.version = processDefinitionData.version
  }

  id: string // "the identifier of the process definition (long)",
  icon: string // "icon path (string)",
  displayDescription: string // "the human readable activity description (string)",
  deploymentDate: Date // "the date when the process definition was deployed (date)",
  description: string // "the process description (string)",
  activationState: ZgwnuBonitaProcessActivationStateType // "the state of the process definition (ENABLED or DISABLED)",
  name: string // "the process name (string)",
  deployedBy: string // "the id of the user who deployed the process (integer)",
  displayName: string // "the human readable process description (string)",
  actorinitiatorid: string // "the id of the actor that can initiate cases of the process",
  last_update_date: Date // "the date when the process definition was last updated (date)",
  configurationState: ZgwnuBonitaProcessConfigurationStateType // "the configuration state of the process (UNRESOLVED or RESOLVED)",
  version: string // "the version of the process (string)"
}