export abstract class BonitaBusinessDataObject {

  constructor(objectData: any)
  {
    if (objectData) {
      if (objectData.persistenceId) { this.persistenceId = objectData.persistenceId }
      if (objectData.persistenceId_string) { this.persistenceId_string = objectData.persistenceId_string }
      if (objectData.persistenceVersion) { this.persistenceVersion = objectData.persistenceVersion }
      if (objectData.persistenceVersion_string) { this.persistenceVersion_string = objectData.persistenceVersion_string }
    }
  }

  persistenceId: number;
  persistenceId_string: string;
  persistenceVersion: number;
  persistenceVersion_string: string;
  // other fields can be defined in child instances
}
