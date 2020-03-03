FROM node:8.11-alpine

RUN mkdir -p /app
WORKDIR /app

COPY ./build ./build
COPY ./express.js ./express.js
COPY ./package.json ./package.json

RUN npm install express express-static-gzip

EXPOSE 5000 80
CMD ["node", "express"]
