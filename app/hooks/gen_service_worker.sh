#!/bin/bash

echo ................................................... running hook .....................................................
echo .......................................... copying initialization file ...............................................
cp src/init-service-worker.js platforms/browser/www/init-service-worker.js
echo ................................ removing default ionic service worker .....................................
rm platforms/browser/www/build/sw-toolbox.js
echo ............................................. generating service worker ..............................................
cd platforms/browser/www/ 
sw-precache --config=../../../sw-precache-config.js --verbose
