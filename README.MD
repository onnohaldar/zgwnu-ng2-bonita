#Angular 2 Lib Bonita BPM Rest Api Lib

This library contains Angular 2 for TypeScript classes that ZaakgerichtWerken.nu will use to create BPM application examples. 
In this initial very Alpha-0 version we just started to understand how to use Angular 2 TypeScript from scratch. We hope that more
experienced developers can help us to improve this good intented initiative.

##Requirements
* Angular 2.x
* Angular 2.x Material
* TypeScript version 2.0.1
* Bonita BPM Community 7.3.2 > or higher (never tested on Commercial Licensed versions)

##Library content
### bonita
Every Angular 2 TypScript Class that we did develop to use the Bonita BPM Rest Api so far. 
#### bonita-rest-api
All basic Bonita Rest Api classes and settings that will be (re)used.
#### bonita-authentication
Basic Bonita BPM Rest Api login and session functionality.
#### bonita-bpm-activity-task
Bonita BPM Activity and Task (info, assign and execution) functionality.
#### bonita-bpm-process
Bonita BPM Process (info and instantiation) functionality.
#### bonita-bpm-data
Bonita BPM Data level functionality.
#### bonita-business-data
Functionality to retrieve Business Data.
#### bonita-file-upload
Functionality to upload files to the Bonita server (create temp. files to use with Bonita Documents).
### datepicker
Copy from a ng2datepicker module (done so to prevent AOT-compling issues)
### toolbar
Basic Angular 2 Material Toolbaar that we use for our applications
