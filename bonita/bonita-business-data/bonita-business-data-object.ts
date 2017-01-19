export abstract class BonitaBusinessDataObject {

  constructor(objectData: any)
  {
    this.persistenceId = objectData.persistenceId
    this.persistenceId_string = objectData.persistenceId_string
    this.persistenceVersion = objectData.persistenceVersion
    this.persistenceVersion_string = objectData.persistenceVersion_string
  }

  persistenceId: number;
  persistenceId_string: string;
  persistenceVersion: number;
  persistenceVersion_string: string;
  // other fields can be defined in child instances
}
