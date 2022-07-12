#!/bin/bash

apt update -y
apt upgrade -y
apt install nodejs -y
apt install yarn -y
apt install figlet -y
chmod +x start.sh
cd checker && yarn install