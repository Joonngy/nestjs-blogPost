FROM node:18-alpine

RUN npm install -g http-server

WORKDIR /usr/src/app

CMD "http-server", "-p", "8080", "./dist"

