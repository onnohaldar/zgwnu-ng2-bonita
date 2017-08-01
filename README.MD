#Angular 2 Library with bonita BPM Rest Api functionality

This library contains Angular 4.x for TypeScript classes that ZaakgerichtWerken.nu will use to create BPM application examples. 
In this initial very Beta-0 version we converted the lib to Angular 4. We hope that more
experienced developers can help us to improve this good intented initiative.

##Requirements
* See package.json in the testApp (see Quickstart)
* Bonita BPM Community 7.4.2 > or higher (NOT tested on Commercial Licensed versions)

##Quickstart
To see how you can use the library. Look at out testApp https://github.com/onnohaldar/zgwnu-ng2-bonita-testapp

##Library content
### bonita
Every Angular 2 TypScript Class that created to use the Bonita BPM Rest Api. 
#### bonita-rest-api
All basic Bonita Rest Api classes and settings that will be (re)used.
#### bonita-authentication
Basic Bonita BPM Rest Api login and session functionality.
#### bonita-bpm-activity-task
Bonita BPM Activity and Task (info, assign and execution) functionality.
#### bonita-bpm-case
Bonita BPM Case (process instance info, context) functionality.
#### bonita-bpm-case-document
Bonita BPM Case Document (document create, search, get) functionality.
#### bonita-bpm-process
Bonita BPM Process (info and instantiation) functionality.
#### bonita-bpm-data
Bonita BPM Data level functionality.
#### bonita-business-data
Functionality to retrieve Business Data.
#### bonita-file-upload
Functionality to upload files to the Bonita server (create temp. files to use with Bonita Documents).
