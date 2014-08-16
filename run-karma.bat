@echo off
start "KarmaTestServer" /min node karma-server.js
karma start karma.e2e.conf.js
taskkill /FI "WINDOWTITLE eq KarmaTestServer" /T /F