// Bonita Rest Api Business Data Query Parameters
// --------------------------------------------------------------------------
//
// based on http://documentation.bonitasoft.com/?page=bdm-api#toc1
//
// Request URL template: ../API/bdm/businessData/_businessDataType_?q=_queryName_
//                       &p=0&c=10&f=param=value
//
export class BonitaBusinessDataQueryParms {

  constructor(
    public queryName: string,
    public page: number,
    public count: number,
    public parameterValues?: string[]
  ) {  }

  getUrlEncondedParms(): string {
      var buildParms: string;

      // q=queryName - the query name
      buildParms = '&q=' + this.queryName;

      // p: index of the page to display
      buildParms = buildParms + '&p=' + String(this.page);
      
      // c: the maximum number of results in the page
      buildParms = buildParms + '&c=' + String(this.count);
      
      // f=parameter=value - sets the parameter value according to business data query parameters 
      //             defined in Bonita BPM Studio For a Boolean parameter, 
      //             the accepted values are true or false.
      if (this.parameterValues != undefined) {
         for (let value of this.parameterValues)
        { 
            buildParms = buildParms + '&f=' + encodeURIComponent(value);
        }
      }

      // return spaces '+' encoded
      var urlEncodedParms: string = buildParms.replace(/%20/g, '+');
      
      return urlEncodedParms;
  }

}