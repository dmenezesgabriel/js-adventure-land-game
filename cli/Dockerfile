FROM node:14-buster-slim

# Create app directory
WORKDIR /usr/src/
# install chromedriver and google-chrome
RUN apt-get -y update
RUN apt-get -y install curl wget unzip

# Install chrome
RUN CHROMEDRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` && \
    wget https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip -d /usr/bin && \
    chmod +x /usr/bin/chromedriver && \
    rm chromedriver_linux64.zip

RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates procps libxss1 \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable

# Install app dependencies
# Different workdir from copy all to not overwrite installed modules
COPY package*.json .
RUN npm install

WORKDIR /usr/src/app

# Bundle app source
COPY . .
