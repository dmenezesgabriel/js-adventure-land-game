FROM node:14-buster-slim

# Create app directory
WORKDIR /usr/src/

# Install app dependencies
# Different workdir from copy all to not overwrite installed modules
COPY package*.json .
RUN npm install

WORKDIR /usr/src/app

# Bundle app source
COPY . .
