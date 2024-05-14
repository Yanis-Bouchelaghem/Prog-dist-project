# syntax=docker/dockerfile:1
FROM node:21.6

WORKDIR /app

#Install node modules
COPY package.json .
RUN npm install

#Copy the files
ENV PATH /app/node_modules/.bin:$PATH
COPY . .