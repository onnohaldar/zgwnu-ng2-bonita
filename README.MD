# DEPRECIATED
__This Library is no longer maintained. ZGW.NU has build a Public NPM Package that contains the same functionality for Agular 4.3.6 (and higher) based on the new Angular HttpClient Module (@common/http).  See NPM Package for more info https://www.npmjs.com/package/@zgwnu/ng-bonita__ 

# Angular 2 Library with bonita BPM Rest Api functionality

This library contains Angular 4.x for TypeScript classes that ZaakgerichtWerken.nu will use to create BPM application examples. 
In this initial very Beta-0 version we converted the lib to Angular 4. We hope that more
experienced developers can help us to improve this good intented initiative.

## Requirements
* Angular 4.x (or higher)
* Bonita BPM Community 7.4.2 (or higher, not tested on Commercial Licensed versions)

## Library content
All components are build based on the bonita Rest Api Documentation. See for additional info how to use the Rest Api https://documentation.bonitasoft.com/?page=_rest-api

#### zgwnu-bonita-rest-api
All basic Bonita Rest Api classes and settings that will be (re)used.
#### zgwnu-bonita-authentication
Basic Bonita BPM Rest Api login and session functionality.
#### zgwnu-bonita-bpm-activity-task
Bonita BPM Activity and Task (info, assign and execution) functionality.
#### zgwnu-bonita-bpm-case
Bonita BPM Case (process instance info, context) functionality.
#### zgwnu-bonita-bpm-case-document
Bonita BPM Case Document (document create, search, get) functionality.
#### zgwnu-bonita-bpm-process
Bonita BPM Process (info and instantiation) functionality.
#### zgwnu-bonita-bpm-data
Bonita BPM Data level functionality.
#### zgwnu-bonita-business-data
Functionality to retrieve Business Data.
#### zgwnu-bonita-file-upload
Functionality to upload files to the Bonita server.
