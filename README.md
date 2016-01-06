# slamon

API Endpoints
-------------
* /monitor/list/:type - list the available monitors of a given type.  Currently type is only 'newrelic'
* /monitor/add/:type/:uuid - add the 3rd party monitor of :type with :uuid to be SLA monitored.  Currently the only :type available is 'newrelic'