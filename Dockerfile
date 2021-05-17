FROM node:12.16-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

CMD ["node", "./src/server.js"]