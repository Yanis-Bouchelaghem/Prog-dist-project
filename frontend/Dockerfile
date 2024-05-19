# syntax=docker/dockerfile:1
FROM node:21.6

WORKDIR /app

COPY package.json .

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .