#!/bin/bash

####
#	Author: Karan Tuteja
####

pm2 kill
sudo kill -9 $(pgrep node) 
sudo kill -9 $(sudo lsof -t -i:3000)

