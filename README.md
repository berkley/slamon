# SLAMon
This app adds functionality to 3rd party endpoints monitors (such as New Relic Synthetics) for SLA compliance.  Features will include:
* public status page
* private status page
* downtime windows
* periodic immutable SLA reporting

API Endpoints
-------------
Complete
* /monitor/list/:type - list the available monitors of a given type.  Currently type is only 'newrelic'

In Progress
* /monitor/add/:type/:uuid - add the 3rd party monitor of :type with :uuid to be SLA monitored.  Currently the only :type available is 'newrelic'
 
Planned
* Lots

UI
--
Planned
* Public Status Page
* Private Status Page

Reporting
---------
Planned
* Periodic PDF email 
